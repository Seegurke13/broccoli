<?php


namespace Seegurke\PageModule\Controller;


use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Seegurke\PageModule\Entity\Content;
use Seegurke\PageModule\Entity\Extra;
use Seegurke\PageModule\Entity\Page;
use Seegurke\PageModule\Repository\PageRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Twig\Environment;

class PageController
{
    /**
     * @var Environment
     */
    private Environment $environment;
    private PageRepository $pageRepository;
    /**
     * @var SerializerInterface
     */
    private SerializerInterface $serializer;
    private EntityManagerInterface $entityManager;
    /**
     * @var LoggerInterface
     */
    private LoggerInterface $logger;

    public function __construct(
        Environment $environment,
        PageRepository $pageRepository,
        SerializerInterface $serializer,
        EntityManagerInterface $entityManager,
        LoggerInterface $logger
    )
    {
        $this->environment = $environment;
        $this->pageRepository = $pageRepository;
        $this->serializer = $serializer;
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    public function __invoke(Request $request)
    {
        $pageModel = [];

        return new Response($this->environment->render($pageModel['template'], $pageModel));
    }

    /**
     * @param Request $request
     * @return Response
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     *
     * @Route("/create")
     */
    public function create(Request $request): Response
    {
        $page = new Page();
        $data = json_decode($request->getContent(), true);
        if (array_key_exists('parent', $data)) {
            $page->setParent($this->pageRepository->find($data['parent']));
        }
        $this->pageRepository->persist($page);

        return new JsonResponse([
            'status' => 'ok'
        ]);
    }

    public function update(): Response
    {
        return new JsonResponse([
            'status' => 'ok'
        ]);
    }

    /**
     * @param Page $page
     * @return Response
     *
     * @Route("/{page}/delete")
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
     * @Route("/list")
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
     * @param Page $page
     *
     * @Route("/{page}/extra/create")
     * @return JsonResponse
     */
    public function createExtra(Page $page)
    {
        $content = new Extra();
        $content->setPage($page);

        $this->entityManager->persist($content);
        $this->entityManager->flush();

        return new JsonResponse([
            'status' => 'ok',
            'data' => [
                'id' => $content->getId()
            ]
        ]);
    }

    /**
     * @param Extra $extra
     * @Route("/extra/{extre}/delete")
     */
    public function deleteExtra(Extra $extra)
    {
        $this->entityManager->remove($extra);
        $this->entityManager->flush();
    }

    /**
     * @param Page $page
     *
     * @Route("/{page}/content/create")
     */
    public function createContent(Page $page)
    {
        $content = new Content();
        $content->setPage($page);

        $this->entityManager->persist($content);
        $this->entityManager->flush();

        return new JsonResponse([
            'status' => 'ok',
            'data' => [
                'id' => $content->getId()
            ]
        ]);
    }

    /**
     * @param Content $content
     *
     * @Route("/content/{content}/delete")
     */
    public function deleteContent(Content $content)
    {
        $this->entityManager->remove($content);
        $this->entityManager->flush();
    }

    /**
     * @return Response
     *
     * @Route("/{page}")
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

    /**
     * @return Response
     * @Route("/api/page/getPlaceholder")
     */
    public function getPlaceholder(Page $page): Response
    {
        return new JsonResponse([
            "main",
            "footer"
        ]);
    }
}