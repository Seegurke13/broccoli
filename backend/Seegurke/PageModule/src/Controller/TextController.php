<?php


namespace Seegurke\PageModule\Controller;


class TextController
{
    public function __invoke(string $text, string $element = null)
    {
        if (!$element) {
            return $text;
        }

        return '<'.$element.'>'.$text.'</'.$element.'>';
    }
}