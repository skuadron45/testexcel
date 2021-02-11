<?php

namespace App\Controllers;

class BaseAdmin extends BaseController
{

    /**
     * Active module
     *
     * @var string
     */
    protected $module = null;

    /**
     * Helpers
     *
     * @var array
     */
    protected $helpers = ['admin', 'form'];

    /**    
     * Render into view
     *
     * @param string $view
     * @return string
     */
    protected function render(string $view)
    {
        $this->vars['module'] = $this->module;
        $this->vars['debugVar'] = $this->debugVar;

        return view('mod/' . $view, $this->vars);
    }
}
