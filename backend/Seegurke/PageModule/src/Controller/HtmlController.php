<?php


namespace Seegurke\PageModule\Controller;


class HtmlController
{
    public function __invoke(string $html)
    {
        return $html;
    }
}