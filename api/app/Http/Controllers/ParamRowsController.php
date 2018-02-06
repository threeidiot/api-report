<?php
/**
 * Created by PhpStorm.
 * User: william
 * Date: 16/5/3
 * Time: 上午11:45
 */

namespace App\Http\Controllers;

use App\Models\Api;
use App\Models\Param;
use Illuminate\Http\Request;

class ParamRowsController extends Controller
{

    public function run(Request $req) {

        $api_id = $req->get('api_id', 0);

        $api = Api::whereId($api_id)->first();
        if (empty($api)) {
            return $this->_ajaxError('没有找到接口记录');
        }

        $rows = Param::whereApiId($api_id)->orderBy('id', 'desc')->get()->toArray();

        return $this->_ajaxSuccess([
            'rows' => $rows,
        ]);
    }
}
