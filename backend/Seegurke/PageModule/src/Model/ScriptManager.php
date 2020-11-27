<?php


namespace Seegurke\PageModule\Model;


class ScriptManager
{
    private array $scripts;

    public function __construct(array $scripts = [])
    {
        $this->scripts = $scripts;
    }

    public function addScript(string $name)
    {
        $this->scripts[] = '<script src="'.$name.'" type="text/javascript"></script>';
    }

    public function addInline(string $script)
    {
        $this->scripts[] = '<script type="text/javascript">'.$script.'</script>';
    }

    public function getAll(): array
    {
        return $this->scripts;
    }
}