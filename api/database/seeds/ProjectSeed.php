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
        $project = new Project();
        $project->title = 'api-report';
        $project->host = '127.0.0.1:7501';
        $project->schemes = 'http';
        $project->base_path = '';
        $project->produces = 'application/json';
        $project->description = 'API Report 自身的 API';
        $project->save();


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
        $api = new Api();
        $api->project_id = $project->id;
        $api->summary = '首页信息';
        $api->path = '/home/info';
        $api->method = 'get';
        $api->save();
    }

    private function projectRows($project)
    {
        $api = new Api();
        $api->project_id = $project->id;
        $api->summary = '项目列表';
        $api->path = '/project/rows';
        $api->method = 'get';
        $api->save();
    }

    private function projectEdit($project)
    {
        $api = new Api();
        $api->project_id = $project->id;
        $api->summary = '项目编辑和添加';
        $api->path = '/project/edit';
        $api->method = 'get';
        $api->save();

        $this->addNumberQueryParam($api->id, 'id', '项目ID 等于 0 添加, 大于 0 编辑', true, 0);
        $this->addStringQueryParam($api->id, 'title', '项目名称', true);
        $this->addStringQueryParam($api->id, 'host', 'API 域名', true, '127.0.0.1:7501');
        $this->addStringQueryParam($api->id, 'schemes', 'API 协议', true, 'http');
        $this->addStringQueryParam($api->id, 'base_path', 'API 路径前缀');
    }

    private function apiRows($project)
    {
        $api = new Api();
        $api->project_id = $project->id;
        $api->summary = '接口列表';
        $api->path = '/api/rows';
        $api->method = 'get';
        $api->save();

        $this->addNumberQueryParam($api->id, 'project_id', '项目 ID', true);
    }

    private function apiEdit($project)
    {
        $api = new Api();
        $api->project_id = $project->id;
        $api->summary = '接口编辑和添加';
        $api->path = '/api/edit';
        $api->method = 'get';
        $api->save();

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
        $api = new Api();
        $api->project_id = $project->id;
        $api->summary = '参数列表';
        $api->path = '/param/rows';
        $api->method = 'get';
        $api->save();

        $this->addNumberQueryParam($api->id, 'api_id', '接口 ID', true);
    }

    private function paramEdit($project)
    {
        $api = new Api();
        $api->project_id = $project->id;
        $api->summary = '参数编辑和添加';
        $api->path = '/param/edit';
        $api->method = 'get';
        $api->save();

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
        $api = new Api();
        $api->project_id = $project->id;
        $api->summary = '全局参数列表';
        $api->path = '/def/param/rows';
        $api->method = 'get';
        $api->save();

        $this->addNumberQueryParam($api->id, 'project_id', '项目 ID', true);
    }

    private function defParamEdit($project)
    {
        $api = new Api();
        $api->project_id = $project->id;
        $api->summary = '全局参数编辑和添加';
        $api->path = '/def/param/edit';
        $api->method = 'get';
        $api->save();

        $this->addNumberQueryParam($api->id, 'id', '等于 0 添加, 大于 0 编辑', true, 0);
        $this->addNumberQueryParam($api->id, 'project_id', '项目 ID', true);
        $this->addStringQueryParam($api->id, 'name', '参数名称', true);
        $this->addStringQueryParam($api->id, 'query', '参数位置', true, 'query');
        $this->addStringQueryParam($api->id, 'type', '类型', true, 'string');
        $this->addStringQueryParam($api->id, 'default', '默认值');
        $this->addNumberQueryParam($api->id, 'required', '是否必填', false, 0);
        $this->addStringQueryParam($api->id, 'description', '描述');
    }

    private function addStringQueryParam($aid, $name, $desc = '', $required = false, $default = '')
    {
        $p = new Param();
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
        $p = new Param();
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
