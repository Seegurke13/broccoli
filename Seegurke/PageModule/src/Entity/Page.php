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

    public function __construct()
    {
        $this->children = new ArrayCollection();

        $this->name = 'Neue Seite';
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
}
