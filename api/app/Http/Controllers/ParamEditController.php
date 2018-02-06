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
use Validator;
use Illuminate\Http\Request;

class ParamEditController extends Controller
{

    public function run(Request $req) {

        $validator = Validator::make($req->all(), [
            'api_id' => 'required',
            'name' => 'required',
            'in' => 'required',
            'type' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->_ajaxError($validator->errors()->first());
        }

        $api = Api::whereId($req->get('api_id', 0))->first();
        if (empty($api)) {
            return $this->_ajaxError('没有找到接口记录');
        }

        // 如果 > 0 是编辑, = 0 是新建
        $id = $req->get('id', 0);
        if ($id) {
            $row = Param::whereId($id)->first();
            if (empty($row)) {
                return $this->_ajaxError('没有找到接口数据');
            }
        } else {
            $row = new Param();
        }

        $row->api_id = $req->get('api_id');
        $row->name = $req->get('name');
        $row->in = $req->get('in');
        $row->type = $req->get('type', '');
        $row->required = $req->get('required') ? 1 : 0;
        $row->default = $req->get('default', '');
        $row->description = $req->get('description');
        $row->save();

        return $this->_ajaxSuccess([
            'row' => Param::whereId($row->id)->first()->toArray()
        ]);
    }


}
