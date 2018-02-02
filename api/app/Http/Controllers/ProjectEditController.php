<?php
/**
 * Created by PhpStorm.
 * User: william
 * Date: 16/5/3
 * Time: 上午11:45
 */

namespace App\Http\Controllers;

use Validator;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectEditController extends Controller
{

    public function run(Request $req) {

        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'host' => 'required',
            'schemes' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->_ajaxError($validator->errors()->first());
        }

        // 如果 > 0 是编辑, = 0 是新建
        $id = $req->get('id', 0);
        if ($id) {
            $row = Project::whereId($id)->first();
        } else {
            $row = new Project();
        }

        if (empty($row)) {
            return $this->_ajaxError('没有找到项目数据');
        }

        $row->title = $req->get('title');
        $row->host = $req->get('host');
        $row->schemes = $req->get('schemes');
        $row->basePath = $req->get('base_path', '');
        $row->save();


        return $this->_ajaxSuccess([
            'row' => Project::whereId($row->id)->first()->toArray()
        ]);
    }


}
