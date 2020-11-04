<?php


namespace Seegurke\PageModule\Controller;


use Seegurke\PageModule\Service\ElementService;
use Symfony\Component\HttpFoundation\Request;

class HtmlelementController
{
    /**
     * @var ElementService
     */
    private ElementService $elementService;

    public function __construct(ElementService $elementService)
    {
        $this->elementService = $elementService;
    }

    public function __invoke(Request $request, array $element = [], string $type = '', array $classes = [])
    {
//        dump($classes);
//        dump($request->attributes);
//        die();
        return '<'.$type.' class="'.implode(' ', $classes).'">'.$this->elementService->parse($element, $request).'</'.$type.'>';
    }
}