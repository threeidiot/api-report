@extends('layouts.doc')

@section('content')
  <div>
    <input name="id" value="0"/>
    <label class="require">id API的ID 等于0的时候添加, 大于0的时候编辑</label><br>
  </div>

  <div>
    <input name="project_id" value="1"/>
    <label class="require">project_id 关联的项目id</label><br>
  </div>

  <div>
    <input name="path" value="/custom/path"/>
    <label class="require">path 请求路径</label><br>
  </div>

  <div>
    <input name="method" value="get"/>
    <label class="require">method 请求方法</label><br>
  </div>

  <div>
    <input name="summary" value="我是摘要"/>
    <label class="require">summary 摘要</label><br>
  </div>

  <div>
    <input name="deprecated" value="0"/>
    <label>deprecated 是否不推荐使用</label><br>
  </div>

  <div>
    <input name="tags" value=""/>
    <label>tags 标签, 多个用逗号隔开</label><br>
  </div>

  <div>
    <input name="description" value=""/>
    <label>description 描述</label><br>
  </div>
@stop

@section('result')
id: ID
project_id: 关联的项目 ID
path: 请求路径
method: 请求方法
summary: 摘要
deprecated: 是否不推荐使用
tags: 标签, 多个用逗号隔开
description: 描述
deleted_at: 删除时间
created_at: 创建时间
updated_at: 更新时间
@stop
