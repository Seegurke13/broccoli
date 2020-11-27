<?php


namespace Seegurke\PageModule\Model;


class StyleManager
{
    private array $styles;

    public function __construct(array $styles = [])
    {
        $this->styles = $styles;
    }

    public function addStylesheet(string $name)
    {
        $this->styles[] = '<link href="'.$name.'" type="text/css" rel="stylesheet"/>';
    }

    public function addInline(string $styles)
    {
        $this->styles[] = '<style>'.$styles.'</style>';
    }

    public function getAll(): array
    {
        return $this->styles;
    }
}