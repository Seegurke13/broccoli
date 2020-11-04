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

    public function __invoke(Request $request, array $children, StyleManager $styleManager, string $direction = 'row', array $classes = [])
    {
        $styleManager->addInline('.layout { display: flex; justify-content: space-between;}');
        $styleManager->addInline('.layout.layout-row { flex-direction: row;}');
        $styleManager->addInline('.layout.layout-column { flex-direction: column;}');
        $styleManager->addInline('.layout.layout-item { flex-grow: 1;}');

        $data = '<div class="layout layout-'.$direction. ' ' . implode(' ', $classes).'">';
        foreach ($children as $child) {
            $data .= $this->elementService->parse($child, $request);
        }
        $data .= '</div>';

        return $data;
    }
}