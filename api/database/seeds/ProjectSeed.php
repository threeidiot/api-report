<?php

use Illuminate\Database\Seeder;
use \App\Models\Project;
use \App\Models\Api;
use \App\Models\Param;

class ProjectSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        # 创建项目
        $project = Project::withTrashed()->whereTitle('api-report')->first();
        if (!$project) {
            $project = new Project();
            $project->title = 'api-report';
            $project->schemes = 'http';
            $project->base_path = '';
            $project->produces = 'application/json';
            $project->description = 'API Report 自身的 API';
        }
        if (App::environment() === 'docker') {
            $project->host = 'nginx:7501';
        } else {
            $project->host = '127.0.0.1:7602';
        }
        $project->save();

        # 创建接口
        $this->homeInfo($project);
        $this->projectRows($project);
        $this->projectEdit($project);
        $this->apiRows($project);
        $this->apiEdit($project);
        $this->paramRows($project);
        $this->paramEdit($project);
        $this->defParamRows($project);
        $this->defParamEdit($project);
    }

    private function homeInfo($project)
    {
        $this->addApi($project->id, '/home/info', 'get', '首页信息');
    }

    private function projectRows($project)
    {
        $this->addApi($project->id, '/project/rows', 'get', '项目列表');
    }

    private function projectEdit($project)
    {
        $api = $this->addApi($project->id, '/project/edit', 'get', '项目编辑和添加');

        $this->addNumberQueryParam($api->id, 'id', '项目ID 等于 0 添加, 大于 0 编辑', true, 0);
        $this->addStringQueryParam($api->id, 'title', '项目名称', true);
        $this->addStringQueryParam($api->id, 'host', 'API 域名', true, '127.0.0.1:7501');
        $this->addStringQueryParam($api->id, 'schemes', 'API 协议', true, 'http');
        $this->addStringQueryParam($api->id, 'base_path', 'API 路径前缀');
    }

    private function apiRows($project)
    {
        $api = $this->addApi($project->id, '/api/rows', 'get', '接口列表');

        $this->addNumberQueryParam($api->id, 'project_id', '项目 ID', true);
    }

    private function apiEdit($project)
    {
        $api = $this->addApi($project->id, '/api/edit', 'get', '接口编辑和添加');

        $this->addNumberQueryParam($api->id, 'id', '等于 0 添加, 大于 0 编辑', true, 0);
        $this->addNumberQueryParam($api->id, 'project_id', '项目 ID', true);
        $this->addStringQueryParam($api->id, 'path', '请求路径', true);
        $this->addStringQueryParam($api->id, 'method', '请求方法', true, 'get');
        $this->addStringQueryParam($api->id, 'summary', '摘要');
        $this->addNumberQueryParam($api->id, 'deprecated', '是否不推荐使用', true, 0);
        $this->addStringQueryParam($api->id, 'tags', '标签, 多个用逗号隔开');
        $this->addStringQueryParam($api->id, 'description', '描述');
    }

    private function paramRows($project)
    {
        $api = $this->addApi($project->id, '/param/rows', 'get', '参数列表');

        $this->addNumberQueryParam($api->id, 'api_id', '接口 ID', true);
    }

    private function paramEdit($project)
    {
        $api = $this->addApi($project->id, '/param/edit', 'get', '参数编辑和添加');

        $this->addNumberQueryParam($api->id, 'id', '等于 0 添加, 大于 0 编辑', true, 0);
        $this->addNumberQueryParam($api->id, 'api_id', '接口 ID', true);
        $this->addStringQueryParam($api->id, 'name', '参数名称', true);
        $this->addStringQueryParam($api->id, 'query', '参数位置', true, 'query');
        $this->addStringQueryParam($api->id, 'type', '类型', true, 'string');
        $this->addStringQueryParam($api->id, 'default', '默认值');
        $this->addNumberQueryParam($api->id, 'required', '是否必填', false, 0);
        $this->addStringQueryParam($api->id, 'description', '描述');
    }

    private function defParamRows($project)
    {
        $api = $this->addApi($project->id, '/def/param/rows', 'get', '全局参数列表');

        $this->addNumberQueryParam($api->id, 'project_id', '项目 ID', true);
    }

    private function defParamEdit($project)
    {
        $api = $this->addApi($project->id, '/def/param/edit', 'get', '全局参数编辑和添加');

        $this->addNumberQueryParam($api->id, 'id', '等于 0 添加, 大于 0 编辑', true, 0);
        $this->addNumberQueryParam($api->id, 'project_id', '项目 ID', true);
        $this->addStringQueryParam($api->id, 'name', '参数名称', true);
        $this->addStringQueryParam($api->id, 'query', '参数位置', true, 'query');
        $this->addStringQueryParam($api->id, 'type', '类型', true, 'string');
        $this->addStringQueryParam($api->id, 'default', '默认值');
        $this->addNumberQueryParam($api->id, 'required', '是否必填', false, 0);
        $this->addStringQueryParam($api->id, 'description', '描述');
    }

    private function addApi($pid, $path, $method, $summary)
    {
        $api = Api::withTrashed()
            ->whereProjectId($pid)
            ->wherePath($path)
            ->whereMethod($method)
            ->first();

        if (!$api) {
            $api = new Api();
        }
        $api->project_id = $pid;
        $api->summary = $summary;
        $api->path = $path;
        $api->method = $method;
        $api->save();

        return $api;
    }

    private function addStringQueryParam($aid, $name, $desc = '', $required = false, $default = '')
    {
        $p = Param::withTrashed()
            ->whereApiId($aid)
            ->whereName($name)
            ->first();
        if (!$p) {
            $p = new Param();
        }

        $p->api_id = $aid;
        $p->name = $name;
        $p->in = 'query';
        $p->type = 'string';
        $p->required = $required;
        $p->default = $default;
        $p->description = $desc;
        $p->save();

        return $p;
    }

    private function addNumberQueryParam($aid, $name, $desc = '', $required = false, $default = '')
    {
        $p = Param::withTrashed()
            ->whereApiId($aid)
            ->whereName($name)
            ->first();
        if (!$p) {
            $p = new Param();
        }

        $p->api_id = $aid;
        $p->name = $name;
        $p->in = 'query';
        $p->type = 'number';
        $p->required = $required;
        $p->default = $default;
        $p->description = $desc;
        $p->save();

        return $p;
    }

}
