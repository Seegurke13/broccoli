<?php


namespace Seegurke\PageModule\Controller;


use Seegurke\PageModule\Model\ScriptManager;
use Seegurke\PageModule\Model\StyleManager;
use Seegurke\PageModule\Service\ElementService;
use Symfony\Component\HttpFoundation\Request;

class LayoutController
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

    public function __invoke(Request $request, array $children = [], array $classes = [], array $styles = [], string $type = 'div')
    {
        $data = '<' . $type . ' class="' . implode(' ', $classes) . '" style="' . implode(';', $this->getStyles($styles)) . '">';
        foreach ($children as $child) {
            $data .= $this->elementService->parse($child, $request);
        }
        $data .= '</' . $type . '>';

        return $data;
    }

    private function getStyles(array $styles)
    {
        $res = [];
        foreach ($styles as $key=>$value) {
            $res[] = $key.':'.$value;
        }

        return $res;
    }
}