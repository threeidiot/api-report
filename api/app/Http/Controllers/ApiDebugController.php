<?php
/**
 * Created by PhpStorm.
 * User: william
 * Date: 16/5/3
 * Time: 上午11:45
 */

namespace App\Http\Controllers;

use App\Models\Api;
use App\Models\DefParam;
use App\Models\Project;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ApiDebugController extends Controller
{

    public function run(Request $req) {
        $api_id = $req->get('api_id', 0);
        $api = Api::whereId($api_id)->first();
        if (empty($api)) {
            return $this->_jsonError('没有找到接口记录');
        }

        $project = Project::whereId($api->project_id)->first();
        $def_param_headers = DefParam::whereProjectId($project->id)->where('in', 'header')->pluck('default', 'name');
        $params = $req->except(array_merge(['api_id'], $def_param_headers->keys()->toArray()));
        $headers = [];
        foreach($def_param_headers as $k => $v) {
            $headers[$k] = $req->get($k, $v);
        }


        $url = "{$project->schemes}://{$project->host}{$project->base_path}{$api->path}";
        $client = new Client();


        $response = null;
        if ($api->method == 'get') {
            $response = $client->request('GET', $url, [
                'query' => $params,
                'headers' => $headers,
            ]);
        }

        if ($api->method == 'post') {
            $response = $client->request('POST', $url, [
                'form_params' => $params,
                'headers' => $headers,
            ]);
        }

        return $this->_jsonSuccess([
            'json' => $response ? json_decode($response->getBody()) : '',
        ]);
    }


}
