<?php


namespace Seegurke\FileModule\Controller;


use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class FileController
{
    /**
     * @var SerializerInterface
     */
    private SerializerInterface $serializer;
    /**
     * @var ParameterBagInterface
     */
    private ParameterBagInterface $parameterBag;

    public function __construct(SerializerInterface $serializer, ParameterBagInterface $parameterBag)
    {
        $this->serializer = $serializer;
        $this->parameterBag = $parameterBag;
    }

    /**
     * @Route("/files/{filepath}", requirements={"filepath"=".+"}, defaults={"filepath"="/"})
     */
    public function get(string $filepath)
    {
        $adapter = new Local($this->parameterBag->get('kernel.project_dir').'/public');
        $filesystem = new Filesystem($adapter);

        $contents = $filesystem->listContents($filepath, false);

        return new Response($this->serializer->serialize(array_map(function ($el) use ($filepath) {
            return [
                'path' => $filepath,
                'label' => $el['filename'] . (isset($el['extension']) ? '.'.$el['extension'] : ''),
                'type' => $el['type'],
                'ext' => isset($el['extension']) ? $el['extension'] : ''
            ];
        }, $contents), 'json', ['json_encode_options' => JSON_UNESCAPED_SLASHES]));
    }

    public function add()
    {

    }

    public function delete()
    {

    }

    public function list()
    {

    }
}