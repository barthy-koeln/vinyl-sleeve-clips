<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route (path="/", name="homepage")
     */
    public function homepage()
    {
        return $this->render('/Page/PHomepage/PHomepage.twig');
    }
}
