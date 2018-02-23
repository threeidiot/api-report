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
use View;

class HomeController extends Controller
{

    public function run()
    {
        $project_cnt = Project::count();

        return $this->_jsonSuccess([
            'project_cnt' => $project_cnt
        ]);
    }

}
