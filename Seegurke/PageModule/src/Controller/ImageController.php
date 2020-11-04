<?php


namespace Seegurke\PageModule\Controller;


use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ImageController
{
    /**
     * @var ParameterBagInterface
     */
    private ParameterBagInterface $parameterBag;

    public function __construct()
    {
    }

    public function __invoke(string $src, string $alt = '', string $title = '')
    {
        return '<img src="'.$src.'" alt="'.$alt.'" title="'.$title.'"/>';
    }
}