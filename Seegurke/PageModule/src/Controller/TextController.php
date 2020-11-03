<?php


namespace Seegurke\PageModule\Controller;


class TextController
{
    public function __invoke(string $value)
    {
        return $value;
    }
}