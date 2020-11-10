<?php


namespace Seegurke\PageModule\Controller;


use Seegurke\PageModule\Model\ScriptManager;
use Seegurke\PageModule\Model\StyleManager;
use Seegurke\PageModule\Service\ElementService;
use Symfony\Component\HttpFoundation\Request;

class ElementController
{
    /**
     * @var ElementService
     */
    private ElementService $elementService;
    /**
     * @var ScriptManager
     */
    private ScriptManager $scriptManager;

    public function __construct(ElementService $elementService)
    {
        $this->elementService = $elementService;
    }

    public function __invoke(Request $request, array $children = [], array $classes = [], string $type = 'div')
    {
        $data = '<'.$type.' class="' .implode(' ', $classes).'">';
        foreach ($children as $child) {
            $data .= $this->elementService->parse($child, $request);
        }
        $data .= '</'.$type.'>';

        return $data;
    }
}