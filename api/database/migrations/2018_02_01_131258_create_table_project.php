<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableProject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('title', 32)->comment('名称');
            $table->string('host', 64)->comment('域名');
            $table->string('schemes', 16)->comment('协议类型');
            $table->string('basePath', 64)->default('')->comment('请求前缀路径');
            $table->string('produces', 64)->default('application/json')->comment('返回数据格式');
            $table->longText('description')->nullable()->comment('描述');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project');
    }
}
