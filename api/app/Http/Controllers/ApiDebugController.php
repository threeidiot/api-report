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
use GuzzleHttp\Client;

class ApiDebugController extends Controller
{

    public function run(Request $req) {
        $api_id = $req->get('api_id', 0);
        $api = Api::whereId($api_id)->first();
        if (empty($api)) {
            return $this->_ajaxError('没有找到接口记录');
        }

        $project = Project::whereId($api->project_id)->first();
        $params = $req->except(['api_id']);
        $url = "{$project->schemes}://{$project->host}{$project->base_path}{$api->path}";
        $client = new Client();

        $response = null;
        if ($api->method == 'get') {
            $response = $client->request('GET', $url, [
                'query' => $params
            ]);
        }

        if ($api->method == 'post') {
            $response = $client->request('POST', $url, [
                'form_params' => $params
            ]);
        }

        return $this->_ajaxSuccess([
            'json' => $response ? json_decode($response->getBody()) : '',
        ]);
    }


}
