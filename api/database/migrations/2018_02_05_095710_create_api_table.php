<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('project_id')->unsigned()->comment('项目 ID');
            $table->string('summary', 64)->comment('摘要');
            $table->string('path', 64)->comment('路径');
            $table->string('method', 64)->comment('请求方法');
            $table->boolean('deprecated')->default(false)->comment('不推荐使用');
            $table->string('tags', 128)->nullable()->comment('标签');
            $table->longText('description')->nullable()->comment('描述');

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('project_id')->references('id')->on('project');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('api');
    }
}
