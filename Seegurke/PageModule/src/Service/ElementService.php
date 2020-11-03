<?php


namespace Seegurke\PageModule\Service;


use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentResolver;
use Symfony\Component\HttpKernel\Controller\ArgumentResolverInterface;
use Symfony\Component\HttpKernel\Controller\ControllerResolver;
use Symfony\Component\HttpKernel\Controller\ControllerResolverInterface;
use Symfony\Component\HttpKernel\Event\ControllerArgumentsEvent;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class ElementService
{
    /**
     * @var ControllerResolverInterface
     */
    private ControllerResolverInterface $controllerResolver;
    /**
     * @var ArgumentResolverInterface
     */
    private ArgumentResolverInterface $argumentResolver;
    /**
     * @var EventDispatcherInterface
     */
    private EventDispatcherInterface $eventDispatcher;
    /**
     * @var HttpKernelInterface
     */
    private HttpKernelInterface $httpKernel;

    public function __construct(
        EventDispatcherInterface $eventDispatcher,
        HttpKernelInterface $httpKernel,
        ControllerResolverInterface $controllerResolver,
        ArgumentResolverInterface $argumentResolver
    )
    {
        $this->controllerResolver = $controllerResolver ? $controllerResolver : new ControllerResolver();
        $this->argumentResolver = $argumentResolver ? $argumentResolver : new ArgumentResolver();
        $this->eventDispatcher = $eventDispatcher;
        $this->httpKernel = $httpKernel;
    }

    public function parse(array $pageData, Request $request)
    {
        $tmp = 'Seegurke\\PageModule\\Controller\\'.strtoupper(substr($pageData['type'], 0 ,1)).substr($pageData['type'], 1).'Controller';

        $request = $request->duplicate();
        $request->attributes->set('_controller', $tmp);
        $content = [];
        foreach ($pageData['content'] as $key => $value) {
            $content[$key] = $value;
        }
        $request->attributes->set('content', $content);

        $event = new RequestEvent($this->httpKernel, $request, HttpKernelInterface::SUB_REQUEST);
        $this->eventDispatcher->dispatch($event, KernelEvents::REQUEST);

        // load controller
        if (false === $controller = $this->controllerResolver->getController($request)) {
            throw new NotFoundHttpException(sprintf('Unable to find the controller for path "%s". The route is wrongly configured.', $request->getPathInfo()));
        }

        $event = new ControllerEvent($this->httpKernel, $controller, $request, HttpKernelInterface::SUB_REQUEST);
        $this->eventDispatcher->dispatch($event, KernelEvents::CONTROLLER);
        $controller = $event->getController();

        // controller arguments
        $arguments = $this->argumentResolver->getArguments($request, $controller);

        $event = new ControllerArgumentsEvent($this->httpKernel, $controller, $arguments, $request, HttpKernelInterface::SUB_REQUEST);
        $this->eventDispatcher->dispatch($event, KernelEvents::CONTROLLER_ARGUMENTS);
        $controller = $event->getController();
        $arguments = $event->getArguments();

        // call controller
        $response = $controller(...$arguments);

        return $response;
    }
}