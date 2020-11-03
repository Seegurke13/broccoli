<?php


namespace Seegurke\PageModule\Controller;


use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Seegurke\PageModule\Entity\Page;
use Seegurke\PageModule\Repository\PageRepository;
use Seegurke\PageModule\Service\ElementService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Twig\Environment;

class PageController
{
    /**
     * @var Environment
     */
    private Environment $environment;
    /**
     * @var PageRepository
     */
    private PageRepository $pageRepository;
    /**
     * @var SerializerInterface
     */
    private SerializerInterface $serializer;
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $entityManager;
    /**
     * @var LoggerInterface
     */
    private LoggerInterface $logger;
    /**
     * @var ElementService
     */
    private ElementService $pageService;

    public function __construct(
        Environment $environment,
        PageRepository $pageRepository,
        SerializerInterface $serializer,
        EntityManagerInterface $entityManager,
        LoggerInterface $logger,
        ElementService $pageService
    )
    {
        $this->environment = $environment;
        $this->pageRepository = $pageRepository;
        $this->serializer = $serializer;
        $this->entityManager = $entityManager;
        $this->logger = $logger;
        $this->pageService = $pageService;
    }

    /**
     * @param Request $request
     * @param Page $page
     * @return Response
     * @Route("/page/{id}/render", requirements={"id":"\d+"})
     */
    public function __invoke(Request $request, Page $page)
    {
        $content = $this->pageService->parse($page->getContent(), $request);

        return new Response($content);
    }

    /**
     * @param Request $request
     * @return Response
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     *
     * @Route("/page/create")
     */
    public function create(Request $request): Response
    {
        $page = new Page();
        $data = json_decode($request->getContent(), true);
        if (array_key_exists('parent', $data)) {
            $page->setParent($this->pageRepository->find($data['parent']));
        }
        $this->pageRepository->persist($page);

        return new JsonResponse(
            $this->serializer->serialize(
                [
                    'status' => 'ok',
                    'data' => $page,
                ],
                'json', [
                    AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                        return $object->getId();
                    },
            ]),
            200,
            [],
            true
        );
    }

    /**
     * @param Page $page
     * @param Request $request
     * @return Response
     * @Route("/page/{page}/update")
     */
    public function update(Page $page, Request $request): Response
    {
        $this->serializer->deserialize($request->getContent(), Page::class, 'json', [
            AbstractNormalizer::OBJECT_TO_POPULATE => $page
        ]);

        $this->entityManager->flush();


        return new JsonResponse([
            'status' => 'ok'
        ]);
    }

    /**
     * @param Page $page
     * @return Response
     *
     * @Route("/page/{page}/delete")
     */
    public function delete(Page $page): Response
    {
        if ($page->getChildren()->count() > 0) {
            foreach ($page->getChildren() as $child) {
                $child->setParent($page->getParent());
            }
        }
        $this->pageRepository->remove($page);

        return new JsonResponse([
            'status' => 'ok'
        ]);
    }

    /**
     * @Route("/tree")
     */
    public function getAllPages()
    {
        $rootPages = $this->pageRepository->findBy([
            'parent' => null
        ]);
        $list = array_map(function ($page) {
            return [
                'id' => $page->getId(),
                'label' => $page->getName(),
                'children' => $this->getChildren($page)
            ];
        }, $rootPages);

        return new Response($this->serializer->serialize($list, 'json'));
    }

    private function getChildren(Page $page)
    {
        return array_map(function (Page $page) {
            return [
                'id' => $page->getId(),
                'label' => $page->getName(),
                'children' => $this->getChildren($page)
            ];
        }, $page->getChildren()->toArray());
    }

    /**
     * @return Response
     *
     * @Route("/page/{page}")
     */
    public function index(Page $page): Response
    {
        return new Response($this->serializer->serialize(
            $page,
            'json',
            [
                'circular_reference_handler' => function ($object) {
                    return $object->getId();
                }
            ]
        ));
    }
}