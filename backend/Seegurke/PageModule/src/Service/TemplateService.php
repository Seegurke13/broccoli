<?php


namespace Seegurke\PageModule\Service;


use Twig\Environment;

class TemplateService
{
    /**
     * @var Environment
     */
    private Environment $environment;

    public function __construct(Environment $environment)
  {
      $this->environment = $environment;
  }

  public function getTemplate()
  {
      $this->environment->render(__DIR__.'/../ressources/test.html.twig', []);
  }
}