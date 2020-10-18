<?php


namespace Seegurke\DataModule\Service;


use Doctrine\DBAL\Driver\Connection;

class ListingDatabaseService
{
    /**
     * @var Connection
     */
    private Connection $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function createSchema(string $name, array $fields)
    {
        $schema = new \Doctrine\DBAL\Schema\Schema();
        $table = $schema->createTable($name);
        $table->addColumn("id", "integer", array("unsigned" => true));
        $table->setPrimaryKey(array("id"));
        foreach ($fields as $column) {
            $table->addColumn($column["name"], $column["type"]);
        }

        $sql = $schema->toSql($this->connection->getDatabasePlatform());
        foreach ($sql as $statement) {
            $this->connection->exec($statement);
        }
    }

    public function updateSchema()
    {

    }

    public function deleteSchema()
    {

    }
}