<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('param', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('api_id')->unsigned()->comment('接口 ID');
            $table->string('name', 64)->comment('参数名称');
            $table->string('in', 32)->comment('参数位置');
            $table->string('type', 32)->comment('类型');
            $table->boolean('required')->default(false)->comment('是否必须');
            $table->text('default')->nullable()->comment('默认值');
            $table->longText('description')->nullable()->comment('描述');

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('api_id')->references('id')->on('api');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('param');
    }
}
