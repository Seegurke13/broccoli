<?php


namespace Seegurke\PageModule\Controller;


use Doctrine\ORM\EntityManagerInterface;
use Seegurke\PageModule\Entity\Content;
use Seegurke\PageModule\Entity\Page;

class ContentController
{
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
}