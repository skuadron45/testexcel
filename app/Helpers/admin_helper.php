<?php

use Backend\Config\Encryption;
use Backend\Config\Services;


function seotitleUrl($string)
{
    return url_title($string, '-', true);
}

function validParamId($id)
{
    return ctype_digit(strval($id));
}

function langModule($lang = '')
{
    return lang('Module\\' . $lang);
}

function adminAsset($url = '')
{
    return base_url('assets/admin/' . $url);
}

/**
 * Site Url + Route To
 *
 * @param string $method
 * @param mixed ...$params
 * @return false|string
 */
function site_route_to(string $method, ...$params)
{
    $url = route_to($method, ...$params);
    return site_url($url);
}

function htmlActiveClass(bool $match)
{
    return $match ? 'active' : '';
}

function htmlMenuOpenClass(bool $match)
{
    return $match ? 'menu-is-opening menu-open' : '';
}
