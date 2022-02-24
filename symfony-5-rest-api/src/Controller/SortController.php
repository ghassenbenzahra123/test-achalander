<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/api", name="api_")
 */

class SortController extends AbstractController
{
    /**
     * @Route("/sort", name="sort",methods={"POST"})
     */
    public function index(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);

        $sortType = $parameters['order'];

        $array = $parameters['numbers'];

        if (!$length = count($array)) {
            return $array;
        }

        for ($outer = 0; $outer < $length; $outer++) {
            for ($inner = 0; $inner < $length; $inner++) {
                if ($sortType == 'des') {
                    if ($array[$outer] > $array[$inner]) {
                        $tmp = $array[$outer];
                        $array[$outer] = $array[$inner];
                        $array[$inner] = $tmp;
                    }
                } else {
                    if ($array[$outer] < $array[$inner]) {
                        $tmp = $array[$outer];
                        $array[$outer] = $array[$inner];
                        $array[$inner] = $tmp;
                    }
                }
            }
        }
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($array));
        return $response;
    }
}
