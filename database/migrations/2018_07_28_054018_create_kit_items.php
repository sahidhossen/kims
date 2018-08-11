<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKitItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kit_items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('condemnation_id')->unsigned()->nullable();
            $table->integer('central_office_id')->unsigned()->nullable();
            $table->integer('item_type_id')->unsigned()->nullable();
            $table->string('image')->nullable();
            $table->integer('status')->default(0);
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
        Schema::dropIfExists('kit_items');
    }
}
