<?php
/**
 * Created by PhpStorm.
 * User: william
 * Date: 16/5/3
 * Time: 上午11:45
 */

namespace App\Http\Controllers;

use App\Models\Api;
use Validator;
use App\Models\Project;
use Illuminate\Http\Request;

class ApiRowsController extends Controller
{

    public function run(Request $req) {

        $project_id = $req->get('project_id', 0);

        $project = Project::whereId($project_id)->first();
        if (empty($project)) {
            return $this->_ajaxError('没有找到项目记录');
        }

        $rows = Api::whereProjectId($project_id)->orderBy('id', 'desc')->get()->toArray();

        return $this->_ajaxSuccess([
            'rows' => $rows,
        ]);
    }
}
