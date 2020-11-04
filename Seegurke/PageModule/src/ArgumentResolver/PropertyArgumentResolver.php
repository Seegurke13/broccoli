<?php


namespace Seegurke\PageModule\ArgumentResolver;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;

class PropertyArgumentResolver implements ArgumentValueResolverInterface
{
    public function supports(Request $request, ArgumentMetadata $argument)
    {
        return $request->attributes->has('properties')
            && array_key_exists($argument->getName(), $request->attributes->get('properties'));
    }

    public function resolve(Request $request, ArgumentMetadata $argument)
    {
        return yield $request->attributes->get('properties')[$argument->getName()];
    }
}