<?php


namespace Seegurke\PageModule\Controller;


use Seegurke\PageModule\Model\ScriptManager;
use Seegurke\PageModule\Model\StyleManager;
use Seegurke\PageModule\Service\ElementService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;
use Twig\Node\TextNode;

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
        foreach ($placeholder as $key => $value) {
            $model[$value['name']] = $this->elementService->parse($value['content'], $request);
        }

        $model['scripts'] = $request->attributes->get(ScriptManager::class)->getAll();
        $model['styles'] = $request->attributes->get(StyleManager::class)->getAll();

        return $this->twig->render($template . '.html.twig', $model);
    }

    /**
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\SyntaxError
     *
     * @Route("/template/getPlaceholder/{template}")
     */
    public function getPlaceholder(string $template)
    {
        $tokens = $this->twig->tokenize($this->twig->getLoader()->getSourceContext($template.'.html.twig'));

        $ast = $this->inferFromAst($this->twig->parse($tokens));
        $placeholders = [];
        foreach ($ast as $key=>$value) {
            $placeholders[] = $key;
        }

        return new JsonResponse($placeholders);
    }

    /**
     * @param \Twig\Node\ModuleNode $ast - An abstract syntax tree parsed from Twig
     * @return array - The variables used in the Twig template
     */
    private function inferFromAst(\Twig\Node\ModuleNode $ast)
    {
        $keys = $this->visit($ast);

        foreach ($keys as $key => $value) {
            if ($value['always_defined'] || $key === '_self') {
                unset($keys[$key]);
            }
        }

        return $keys;
    }

    /**
     * @param \Twig\Node\Node $ast - The tree to traverse and extract variables
     * @return array - The variables found in this tree
     */
    private function visit(\Twig\Node\Node $ast)
    {
        $vars = [];
        switch (get_class($ast)) {
            case \Twig\Node\Expression\AssignNameExpression::class:
            case \Twig\Node\Expression\NameExpression::class:
                $vars[$ast->getAttribute('name')] = [
                    'type' => get_class($ast),
                    'always_defined' => $ast->getAttribute('always_defined'),
                    'is_defined_test' => $ast->getAttribute('is_defined_test'),
                    'ignore_strict_check' => $ast->getAttribute('ignore_strict_check')
                ];
                break;
            case \Twig\Node\ForNode::class:
                foreach ($ast as $key => $node) {
                    switch ($key) {
                        case 'value_target':
                            $vars[$node->getAttribute('name')] = [
                                'for_loop_target' => true,
                                'always_defined' => $node->getAttribute('always_defined')
                            ];
                            break;
                        case 'body':
                            $vars = array_merge($vars, $this->visit($node));
                            break;
                        default:
                            break;
                    }
                }
                break;
            case \Twig\Node\IfNode::class:
                foreach ($ast->getNode('tests') as $key => $test) {
                    $vars = array_merge($vars, $this->visit($test));
                }
                foreach ($ast->getNode('else') as $key => $else) {
                    $vars = array_merge($vars, $this->visit($else));
                }
                break;
            default:
                if ($ast->count()) {
                    foreach ($ast as $key => $node) {
                        $vars = array_merge($vars, $this->visit($node));
                    }
                }
                break;
        }
        return $vars;
    }
}