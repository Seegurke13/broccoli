<?php


namespace Seegurke\PageModule\Entity;


use Doctrine\ORM\Mapping as ORM;

/**
 * Class Content
 * @package Seegurke\PageModule\Entity
 *
 * @ORM\Entity
 */
class Content
{
    /**
     * @var int
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Id
     */
    private $id;

    /**
     * @var Page
     * @ORM\ManyToOne(targetEntity="Seegurke\PageModule\Entity\Page", inversedBy="content")
     */
    private $page;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return Page
     */
    public function getPage(): Page
    {
        return $this->page;
    }

    /**
     * @param Page $page
     */
    public function setPage(Page $page): void
    {
        $this->page = $page;
    }
}