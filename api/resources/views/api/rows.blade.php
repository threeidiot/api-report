@extends('layouts.doc')

@section('content')
  <div>
    <input name="project_id" value="1"/>
    <label class="require">project_id 关联的项目id</label><br>
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
