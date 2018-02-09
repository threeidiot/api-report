<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDefParams extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('def_param', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('project_id')->unsigned()->comment('项目 ID');
            $table->string('name', 64)->comment('参数名称');
            $table->string('in', 32)->comment('参数位置');
            $table->string('type', 32)->comment('类型');
            $table->boolean('required')->default(false)->comment('是否必须');
            $table->text('default')->nullable()->comment('默认值');
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
        Schema::dropIfExists('def_param');
    }
}
