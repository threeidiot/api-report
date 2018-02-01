<?php
/**
 * Created by PhpStorm.
 * User: william
 * Date: 16/5/3
 * Time: 上午11:45
 */

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{

    public function rows(Request $req) {

        $rows = Project::get()->toArray();

        return $this->_ajaxSuccess([
            'rows' => $rows,
        ]);
    }

    public function edit(Request $req) {

        $id = $req->get('id', 1);
        $row = Project::whereId($id)->first();
        if (empty($row)) {
            return $this->_ajaxError('没有找到项目数据');
        }

        return $this->_ajaxSuccess([
            'row' => $row->toArray(),
        ]);
    }


}
