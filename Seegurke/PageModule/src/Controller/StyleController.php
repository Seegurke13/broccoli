<?php


namespace Seegurke\PageModule\Controller;


use Sabberworm\CSS\Parser;
use Sabberworm\CSS\Property\Selector;
use Sabberworm\CSS\RuleSet\DeclarationBlock;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class StyleController
{
    /**
     * @var mixed
     */
    private $publicDir;

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->publicDir = $parameterBag->get('kernel.project_dir') . '/public/css/';
    }

    /**
     * @Route("/css/getClasses")
     */
    public function getCssClasses() {
        $oCssParser = new Parser(file_get_contents($this->publicDir . 'bootstrap.css'));
        $oCss = $oCssParser->parse();

        $test = array_reduce($oCss->getAllDeclarationBlocks(), function (array $carry, DeclarationBlock $block) {
           return array_reduce($block->getSelectors(), function (array $carry, Selector $selector) {
               $re = '/\.([a-zA-Z0-9\-]*)/m';
               $str = $selector->getSelector();
               preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);
               foreach ($matches as $match) {
                   if (!in_array($match[1], $carry)) {
                       $carry[] = $match[1];
                   }
               }

               return $carry;
           }, $carry);
        }, []);

        return new JsonResponse($test);
    }
}