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
                'name' => 'user',
                'file' => 'src/app/user/user.module#UserModule',
            ],
        ];

        return new JsonResponse($response);
    }
}