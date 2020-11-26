<?php


namespace App\Controller;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ConfigController
{
    /**
     * @return JsonResponse
     * @Route("/admin/config")
     */
    public function index()
    {
//        $response = [
//            [
//                'name' => 'user',
//                'file' => 'src/app/user/user.module#UserModule',
//            ],
//        ];

        $response = [
            'modules' => [
                'src/app/user/user.module#UserModule', 'src/app/content/content.module#ContentModule'
            ],
            'routes' => [
                [
                    'path' => 'content',
//                    'component' => 'ContentModule.PageComponent',
                    'children' => [
                        [
                            'path' => 'page',
                            'component' => 'ContentModule.PageComponent',
                            'children' => [
                                [
                                    'path' => ':id',
                                    'component' => 'ContentModule.PageViewComponent'
                                ],
                            ]
                        ],
                        [
                            'path' => 'form',
                            'component' => 'ContentModule.FormComponent',
//                            'children' => [
//                                'path' => ':id',
//                                'component' => 'ContentModule.FormComponent'
//                            ],
                        ],
                        [
                            'path' => 'form/:id',
                            'component' => 'ContentModule.FormComponent',
                        ],
                    ],
                ],
                [
                    'path' => 'user',
                    'component' => 'UserModule.UserComponent'
                ],
            ],
        ];

        return new JsonResponse($response);
    }
}