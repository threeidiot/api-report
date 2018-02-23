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
use Illuminate\Http\Request;

class ApiRowsController extends Controller
{

    public function run(Request $req)
    {
        $project_id = (int)$req->get('project_id', 0);
        $project = Project::whereId($project_id)->first();
        if (!$project) {
            return $this->_jsonError('没有找到项目记录');
        }
        $rows = Api::whereProjectId($project_id)
            ->orderByDesc('id')->get();
        return $this->_jsonSuccess(['rows' => $rows]);
    }
}
