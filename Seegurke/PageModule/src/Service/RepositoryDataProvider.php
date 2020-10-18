<?php


namespace Seegurke\PageModule\Service;


use Doctrine\Persistence\ObjectRepository;

class RepositoryDataProvider implements DataProvider
{
    /**
     * @var ObjectRepository
     */
    private $repository;

    /**
     * @var string
     */
    private $fieldName;

    public function __construct(ObjectRepository $repository, string $fieldName = 'name')
    {
        $this->repository = $repository;
        $this->fieldName = $fieldName;
    }

    public function getData($id)
    {
        return $this->repository->findOneBy([
            $this->fieldName => $id,
        ]);
    }
}