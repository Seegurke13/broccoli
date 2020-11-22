<?php


namespace App\Controller;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ModuleController
{
    /**
     * @return JsonResponse
     * @Route("/admin/module")
     */
    public function index() {
        $response = [
            [
                'name' => 'page',
                'component' => '',
            ],
            [
                'name' => 'data',
                'component' => ''
            ],
        ];

        return new JsonResponse($response);
    }
}