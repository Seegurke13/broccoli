<?php


namespace Seegurke\PageModule\Service;


use Psr\EventDispatcher\EventDispatcherInterface;
use Seegurke\PageModule\Controller\PageController;
use Seegurke\PageModule\Entity\Page;
use Seegurke\PageModule\Event\ProvideDataEvent;
use Seegurke\PageModule\Repository\PageRepository;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class PageRouter implements EventSubscriberInterface
{
    /**
     * @var PageRepository
     */
    private PageRepository $pageRepository;

    /**
     * @var EventDispatcherInterface
     */
    private EventDispatcherInterface $eventDispatcher;

    public function __construct(PageRepository $pageRepository, EventDispatcherInterface $eventDispatcher)
    {
        $this->pageRepository = $pageRepository;
        $this->eventDispatcher = $eventDispatcher;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => ['route', 200]
        ];
    }

    public function route(RequestEvent $requestEvent): void
    {
        $request = $requestEvent->getRequest();
        if (!$request->attributes->has('_controller')) {
            $url = $request->getRequestUri();
            if (strpos($url, "/") === 0) {
                $url = substr($url, 1);
            }
            $urlParts = explode('/', $url);
            $parent = null;
            $page = null;
            for ($i = 0; $i < count($urlParts); $i++) {
                if ($parent === null && $i === 0) {
                    $page = $this->pageRepository->findOneBy([
                        'name' => $urlParts[$i],
                    ]);
                } else {
                    $page = $this->pageRepository->findOneBy([
                        'parent' => $parent,
                        'name' => $urlParts[$i],
                        'dynamic' => false
                    ]);

                    if ($page === null) {
                        $dynamicChildren = $this->pageRepository->findBy([
                            'parent' => $parent,
                            'dynamic' => true,
                        ]);
                        foreach ($dynamicChildren as $dynamicChild) {
                            $dataSourceEvent = new ProvideDataEvent();
                            $dataSourceEvent->setSource($dynamicChild->getData()['provider']['source']);
                            $this->eventDispatcher->dispatch($dataSourceEvent);
                            $data = $dataSourceEvent->getDataProvider()->getData($urlParts[$i]);
                            if ($data) {
                                $request->attributes->set($dynamicChild->getName(), $data);
                                $page = $dynamicChild;
                            }
                        }
                    }
                }
                if ($page === null) {
                    break;
                }

                $parent = $page;
            }

            if ($page) {
                $request->attributes->set('_controller', PageController::class);
            }
        }
    }
}