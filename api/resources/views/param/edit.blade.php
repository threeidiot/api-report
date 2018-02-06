@extends('layouts.doc')

@section('content')
  <div>
    <input name="id" value="0"/>
    <label class="require">id 参数ID 等于0的时候添加, 大于0的时候编辑</label><br>
  </div>

  <div>
    <input name="api_id" value="1"/>
    <label class="require">api_id 关联的项目id</label><br>
  </div>

  <div>
    <input name="name" value="anything"/>
    <label class="require">name 参数名称</label><br>
  </div>

  <div>
    <input name="in" value="query"/>
    <label class="require">in 参数位置</label><br>
  </div>

  <div>
    <input name="type" value="string"/>
    <label class="require">type 类型</label><br>
  </div>

  <div>
    <input name="default" value=""/>
    <label>default 默认值</label><br>
  </div>

  <div>
    <input name="required" value="0"/>
    <label>required 是否必须</label><br>
  </div>

  <div>
    <input name="description" value=""/>
    <label>description 描述</label><br>
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
