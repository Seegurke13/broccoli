<?php


namespace Seegurke\DataModule\Controller;


use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Schema\Table;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Seegurke\DataModule\Entity\ListDefinition;
use Seegurke\DataModule\Repository\ListingDefinitionRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ListingController
{
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $entityManager;
    /**
     * @var SerializerInterface
     */
    private SerializerInterface $serializer;
    /**
     * @var ListingDefinitionRepository
     */
    private ListingDefinitionRepository $definitionRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer,
        ListingDefinitionRepository $definitionRepository
    ) {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
        $this->definitionRepository = $definitionRepository;
    }

    /**
     * @Route("/test1")
     */
    public function createTable()
    {
        $columns = [
           'name' => 'string'
        ];
    }

    public function removeTable()
    {

    }

    public function updateTable()
    {

    }

    /**
     * @return Response
     * @Route("/api/data/listing/{id}")
     */
    public function getListing(Request $request)
    {
        $id = $request->attributes->get('id');
        $definition = $this->definitionRepository->find((int) $id);
        $pageSize = $request->query->get('pageSize', 10);
        $pageNumber = $request->query->get('pageNumber', 0);
        $listingName = $definition->getName();
        $fieldNames = array_map(function($field) {return $field['name'];}, $definition->getData()['fields']);

        $connection = $this->entityManager->getConnection();
        $qb = $connection->createQueryBuilder();
        $qb->select($fieldNames);
        $qb->from($listingName);
        $qb->setFirstResult($pageNumber * $pageSize);
        $qb->setMaxResults($pageSize);
        $stmt = $qb->execute();
        $res = $stmt->fetchAll();
        $data['name'] = 'test';
        $data['results'] = $res;
        $data['count'] = $connection->executeQuery("SELECT COUNT(id) AS count FROM {$listingName}")->fetch()['count'];

        return new Response($this->serializer->serialize($data, 'json'));
    }
}