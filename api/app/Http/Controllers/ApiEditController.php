<?php
/**
 * Created by PhpStorm.
 * User: william
 * Date: 16/5/3
 * Time: 上午11:45
 */

namespace App\Http\Controllers;

use App\Models\Api;
use App\Models\Project;
use Validator;
use Illuminate\Http\Request;

class ApiEditController extends Controller
{

    public function run(Request $req) {

        $validator = Validator::make($req->all(), [
            'summary' => 'required',
            'path' => 'required',
            'method' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->_jsonError($validator->errors()->first());
        }

        $project = Project::whereId($req->get('project_id', 0))->first();
        if (empty($project)) {
            return $this->_jsonError('没有找到项目记录');
        }

        // 如果 > 0 是编辑, = 0 是新建
        $id = $req->get('id', 0);
        if ($id) {
            $row = Api::whereId($id)->first();
            if (empty($row)) {
                return $this->_jsonError('没有找到接口数据');
            }
        } else {
            $row = new Api();
        }


        $row->project_id = $req->get('project_id');
        $row->path = $req->get('path');
        $row->method = strtolower($req->get('method'));
        $row->deprecated = $req->get('deprecated') ? 1 : 0;
        $row->tags = $req->get('tags', '');
        $row->summary = $req->get('summary', '');
        $row->description = $req->get('description');
        $row->save();


        return $this->_jsonSuccess([
            'row' => Api::whereId($row->id)->first()->toArray()
        ]);
    }


}
