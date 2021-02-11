<?php
namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class BaseController extends Controller
{

    use ResponseTrait;

    protected $helpers = [];

    /**
     * Variables for view
     *
     * @var array
     */
    protected $vars = [];

    /**
     * Debug state
     *
     * @var boolean
     */
    protected $debugVar = false;

    /**
     * Init Controller
     *
     * @param RequestInterface $request
     * @param ResponseInterface $response
     * @param LoggerInterface $logger
     * @return void
     */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        $customHelpers = $this->getCustomHelpers();
        $this->helpers = array_merge($this->helpers, $customHelpers);

        parent::initController($request, $response, $logger);        
    }

    /**
     * Response json
     *
     * @param mixed $data
     * @param string $message
     * @param boolean $isSuccess
     * @param integer $code
     * @return mixed
     */
    protected function respondJson($data, string $message, bool $isSuccess = true, int $code)
    {

        $result["success"] = $isSuccess;
        $result["message"] = $message;
        $result["data"] = $data;

        $result['token'] = [
            'name' => csrf_token(),
            'key' => csrf_hash()
        ];

        if (!$isSuccess) {
            $result["error_code"] = $code;
        }
        return $this->respond($result, $code);
    }

    /**
     * Success response
     *
     * @param array $data
     * @param string $message
     * @param integer $code
     * @return mixed
     */
    protected function successRespond(array $data = [], string $message = "Success", int $code = 200)
    {
        return $this->respondJson($data, $message, true, $code);
    }

    /**
     * Fail Response
     *
     * @param array $data
     * @param string $message
     * @param integer $code
     * @return void
     */
    protected function failRespond(array $data = [], string $message = "Fail", int $code = 400)
    {
        return $this->respondJson($data, $message, false, $code);
    }

    /**
     * Custom helpers
     *
     * @return array
     */
    protected function getCustomHelpers()
    {
        return [];
    }
}
