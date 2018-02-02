@extends('layouts.doc')

@section('content')
  <div>
    <input name="id" value="0"/>
    <label class="require">id 项目ID 等于0的时候添加, 大于0的时候编辑</label><br>
  </div>

  <div>
    <input name="title" value="测试项目"/>
    <label class="require">title 项目名称</label><br>
  </div>

  <div>
    <input name="host" value="127.0.0.1:7500"/>
    <label class="require">host API 域名</label><br>
  </div>

  <div>
    <input name="schemes" value="http"/>
    <label class="require">host API 协议</label><br>
  </div>

  <div>
    <input name="base_path" value="/v1"/>
    <label>base_path API 路径前缀</label><br>
  </div>
@stop

@section('result')
title: 项目名称
host: API 域名
schemes: API 协议 (http | https)
base_path: 所有 API 的路径前缀
produces: 返回值类型
description: 项目描述
deleted_at: 删除时间
created_at: 创建时间
updated_at: 更新时间
@stop
