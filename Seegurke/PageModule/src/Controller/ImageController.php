<?php


namespace Seegurke\PageModule\Controller;


class ImageController
{
    public function __invoke(string $src, string $alt)
    {
        return '<img src="'.$src.'" alt="'.$alt.'"/>';
    }
}