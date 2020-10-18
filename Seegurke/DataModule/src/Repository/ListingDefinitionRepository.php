<?php


namespace Seegurke\DataModule\Repository;


use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Seegurke\DataModule\Entity\ListDefinition;

class ListingDefinitionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ListDefinition::class);
    }
}