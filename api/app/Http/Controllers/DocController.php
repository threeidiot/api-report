<?php
/**
 * Created by PhpStorm.
 * User: william
 * Date: 16/5/3
 * Time: 上午11:45
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use View;

class DocController extends Controller
{

    public function rows()
    {
        return View::make('doc.rows');
    }


    public function page(Request $request, $category, $action)
    {
        $action = strtolower($action);
        $api_path = "/{$category}/{$action}";
        $view_path = "{$category}.{$action}";

        return view($view_path, [
            'api_path' => $api_path,
            'api_name' => $request->get('api_name', '')
        ]);
    }
}
