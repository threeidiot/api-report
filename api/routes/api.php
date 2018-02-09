<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

# 项目列表,编辑,添加
Route::get('/project/rows', 'ProjectRowsController@run');
Route::get('/project/edit', 'ProjectEditController@run');

# API列表,编辑,添加,调试
Route::get('/api/rows', 'ApiRowsController@run');
Route::get('/api/edit', 'ApiEditController@run');
Route::get('/api/debug', 'ApiDebugController@run');

# 参数列表,编辑,添加
Route::get('/param/rows', 'ParamRowsController@run');
Route::get('/param/edit', 'ParamEditController@run');
