<?php


namespace Seegurke\PageModule\ArgumentResolver;


use Seegurke\PageModule\Model\ScriptManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;

class ScriptManagerResolver implements ArgumentValueResolverInterface
{
    public function supports(Request $request, ArgumentMetadata $argument)
    {
        return $argument->getType() === ScriptManager::class && $request->attributes->has(ScriptManager::class);
    }

    public function resolve(Request $request, ArgumentMetadata $argument)
    {
        yield $request->attributes->get(ScriptManager::class);
    }
}