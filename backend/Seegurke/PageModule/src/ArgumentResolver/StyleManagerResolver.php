<?php


namespace Seegurke\PageModule\ArgumentResolver;


use Seegurke\PageModule\Model\StyleManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;

class StyleManagerResolver implements ArgumentValueResolverInterface
{
    public function supports(Request $request, ArgumentMetadata $argument)
    {
        return $argument->getType() === StyleManager::class && $request->attributes->has(StyleManager::class);
    }

    public function resolve(Request $request, ArgumentMetadata $argument)
    {
        yield $request->attributes->get(StyleManager::class);
    }
}