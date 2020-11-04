<?php


namespace Seegurke\PageModule\ArgumentResolver;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;

class ContentArgumentResolver implements ArgumentValueResolverInterface
{
    public function supports(Request $request, ArgumentMetadata $argument)
    {
        return $request->attributes->has('content')
            && array_key_exists($argument->getName(), $request->attributes->get('content'));
    }

    public function resolve(Request $request, ArgumentMetadata $argument)
    {
        return yield $request->attributes->get('content')[$argument->getName()];
    }
}