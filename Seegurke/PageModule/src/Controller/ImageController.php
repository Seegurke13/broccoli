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

    public function __invoke(string $src = '', string $alt = '', string $title = '', array $classes = [], array $cClasses = [])
    {
        return '<div class="'.implode(' ', $cClasses).'"><img style="max-width: 100%;" src="'.$src.'" alt="'.$alt.'" title="'.$title.'" class="'.implode(' ', $classes).'"/></div>';
    }
}