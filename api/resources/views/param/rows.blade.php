@extends('layouts.doc')

@section('content')
  <div>
    <input name="api_id" value="1"/>
    <label class="require">api_id 关联的项目id</label><br>
  </div>
@stop

@section('result')
id: ID
api_id: 关联的接口 ID
name: 参数名称
in: 参数位置
type: 类型
required: 是否必须
default: 默认值
description: 描述
deleted_at: 删除时间
created_at: 创建时间
updated_at: 更新时间
@stop
