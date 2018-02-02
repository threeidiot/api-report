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

class ProjectRowsController extends Controller
{

    public function run(Request $req) {

        $rows = Project::orderBy('id', 'desc')->get()->toArray();

        return $this->_ajaxSuccess([
            'rows' => $rows,
        ]);
    }
}
