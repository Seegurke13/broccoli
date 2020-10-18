<?php


namespace Seegurke\PageModule\Controller;




use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PageTemplateController
{
    /**
     * @return Response
     * @Route("/test")
     */
    public function test()
    {
        return new Response();
    }
}