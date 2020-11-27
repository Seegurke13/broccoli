<?php


namespace Seegurke\PageModule\ArgumentResolver;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;

class SettingsArgumentResolver implements ArgumentValueResolverInterface
{
    public function supports(Request $request, ArgumentMetadata $argument)
    {
        return $request->attributes->has('settings')
            && array_key_exists($argument->getName(), $request->attributes->get('settings'))
            && !($argument->getType() === 'string' && empty($request->attributes->get('settings')[$argument->getName()]));
    }

    public function resolve(Request $request, ArgumentMetadata $argument)
    {
        return yield $request->attributes->get('settings')[$argument->getName()];
    }
}