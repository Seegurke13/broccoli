<?php


namespace Seegurke\PageModule\Event;


use Seegurke\PageModule\Service\DataProvider;
use Symfony\Contracts\EventDispatcher\Event;

class ProvideDataEvent extends Event
{
    private string $source;
    private DataProvider $dataProvider;

    public function setSource($source)
    {
        $this->source = $source;
    }

    public function getSource()
    {
        return $this->source;
    }

    public function setDataProvider($dataProvider)
    {
        $this->dataProvider = $dataProvider;
    }

    public function getDataProvider(): DataProvider
    {
        return $this->dataProvider;
    }
}