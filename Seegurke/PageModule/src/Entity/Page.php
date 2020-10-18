<?php

namespace Seegurke\PageModule\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Seegurke\PageModule\Repository\PageRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PageRepository::class)
 */
class Page
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $name;

    /**
     * @var Page|null
     * @ORM\ManyToOne(targetEntity="Page", inversedBy="children")
     */
    private ?Page $parent;

    /**
     * @var Page[]
     * @ORM\OneToMany(targetEntity="Page", mappedBy="parent")
     */
    private $children;

    /**
     * @ORM\Column(type="json")
     */
    private array $data = [];

    /**
     * @var Content[]
     * @ORM\OneToMany(targetEntity="Seegurke\PageModule\Entity\Content", mappedBy="page")
     */
    private $content;

    /**
     * @var Extra[]
     * @ORM\OneToMany(targetEntity="Seegurke\PageModule\Entity\Extra", mappedBy="page")
     */
    private $extras;

    /**
     * @var boolean
     * @ORM\Column(type="boolean")
     */
    private bool $dynamic;

    public function __construct()
    {
        $this->children = new ArrayCollection();
        $this->content = new ArrayCollection();
        $this->extras = new ArrayCollection();

        $this->name = 'Neue Seite';
        $this->dynamic = false;
        $this->data = [];
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return array
     */
    public function getData(): array
    {
        return $this->data;
    }

    /**
     * @param array $data
     */
    public function setData(array $data): void
    {
        $this->data = $data;
    }

    /**
     * @return bool
     */
    public function isDynamic(): bool
    {
        return $this->dynamic;
    }

    /**
     * @param bool $dynamic
     */
    public function setDynamic(bool $dynamic): void
    {
        $this->dynamic = $dynamic;
    }

    public function getChildren()
    {
        return $this->children;
    }

    public function getParent()
    {
        return $this->parent;
    }

    public function setParent(?Page $page)
    {
        $this->parent = $page;
    }
}
