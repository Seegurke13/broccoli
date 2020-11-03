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

    public function __invoke(Request $request, array $children, StyleManager $styleManager)
    {
        $styleManager->addInline('.layout { display: flex; justify-content: space-between;}');
        $styleManager->addInline('.layout-item { flex-grow: 1;}');

        $data = '<div class="layout">';
        foreach ($children as $child) {
            $data .= '<div class="layout-item">'.$this->elementService->parse($child, $request).'</div>';
        }
        $data .= '</div>';

        return $data;
    }
}