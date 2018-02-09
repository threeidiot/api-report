<?php
/**
 * Created by PhpStorm.
 * User: william
 * Date: 16/5/3
 * Time: 上午11:45
 */

namespace App\Http\Controllers;

use App\Models\DefParam;
use App\Models\Project;
use Validator;
use Illuminate\Http\Request;

class DefParamEditController extends Controller
{

    public function run(Request $req) {

        $validator = Validator::make($req->all(), [
            'project_id' => 'required',
            'name' => 'required',
            'in' => 'required',
            'type' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->_ajaxError($validator->errors()->first());
        }

        $project = Project::whereId($req->get('project_id', 0))->first();
        if (empty($project)) {
            return $this->_ajaxError('没有找到项目记录');
        }

        // 如果 > 0 是编辑, = 0 是新建
        $id = $req->get('id', 0);
        if ($id) {
            $row = DefParam::whereId($id)->first();
            if (empty($row)) {
                return $this->_ajaxError('没有找到预定义参数数据');
            }
        } else {
            $row = new DefParam();
        }

        $row->project_id = $req->get('project_id');
        $row->name = $req->get('name');
        $row->in = $req->get('in');
        $row->type = $req->get('type', '');
        $row->required = $req->get('required') ? 1 : 0;
        $row->default = $req->get('default', '');
        $row->description = $req->get('description');
        $row->save();

        return $this->_ajaxSuccess([
            'row' => DefParam::whereId($row->id)->first()
        ]);
    }


}
