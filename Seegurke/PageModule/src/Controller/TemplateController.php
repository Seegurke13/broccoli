<?php


namespace Seegurke\PageModule\Controller;


use Seegurke\PageModule\Model\ScriptManager;
use Seegurke\PageModule\Model\StyleManager;
use Seegurke\PageModule\Service\ElementService;
use Symfony\Component\HttpFoundation\Request;
use Twig\Environment;

class TemplateController
{
    /**
     * @var Environment
     */
    private Environment $twig;
    /**
     * @var ElementService
     */
    private ElementService $elementService;

    public function __construct(Environment $twig, ElementService $elementService)
    {
        $this->twig = $twig;
        $this->elementService = $elementService;
    }

    public function __invoke(Request $request, string $template, array $placeholder)
    {
        $request->attributes->set(ScriptManager::class, new ScriptManager());
        $request->attributes->set(StyleManager::class, new StyleManager());

        $model = [];
        foreach ($placeholder as $key=>$value) {
            $model[$value['name']] = $this->elementService->parse($value['content'], $request);
        }

        $model['scripts'] = $request->attributes->get(ScriptManager::class)->getAll();
        $model['styles'] = $request->attributes->get(StyleManager::class)->getAll();

        return $this->twig->render($template . '.html.twig', $model);
    }
}