<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function _jsonSuccess($data, $cookie = null) {
        $resp = Response::json([
            'status' => 'success',
            'result' => $data,
        ]);

        if (!empty($cookie)) {
            $resp->withCookie($cookie);
        }

        return $resp;
    }

    protected function _jsonError($msg) {
        return Response::json([
            'status'  => 'error',
            'message' => $msg,
        ]);
    }
}
