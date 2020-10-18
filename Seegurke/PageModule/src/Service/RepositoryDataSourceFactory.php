<?php


namespace Seegurke\PageModule\Service;


use Doctrine\ORM\EntityManagerInterface;
use Seegurke\PageModule\Event\ProvideDataEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class RepositoryDataSourceFactory implements EventSubscriberInterface
{
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            ProvideDataEvent::class => ['createProvider', 200]
        ];
    }

    public function createProvider(ProvideDataEvent $dataEvent)
    {
        if (strpos($dataEvent->getSource(), 'repository:') === 0) {
            $repo = $this->entityManager->getRepository(explode(':', $dataEvent->getSource())[1]);
            $dataEvent->setDataProvider(new RepositoryDataProvider($repo));
        }
    }
}