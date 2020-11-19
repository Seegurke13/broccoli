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
    private ?Page $parent = null;

    /**
     * @var Page[]
     * @ORM\OneToMany(targetEntity="Page", mappedBy="parent")
     */
    private $children;

    /**
     * @var array
     * @ORM\Column(type="json")
     */
    private array $content;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    private string $route;

    public function __construct()
    {
        $this->children = new ArrayCollection();

        $this->name = 'Neue Seite';
        $this->content = [];
        $this->route = '';
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

    /**
     * @return array
     */
    public function getContent(): array
    {
        return $this->content;
    }

    /**
     * @param array $content
     */
    public function setContent(array $content): void
    {
        $this->content = $content;
    }

    /**
     * @return string
     */
    public function getRoute(): string
    {
        return $this->route;
    }

    /**
     * @param string $route
     */
    public function setRoute(string $route): void
    {
        $this->route = $route;
    }
}
