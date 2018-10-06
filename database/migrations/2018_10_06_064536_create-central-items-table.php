<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCentralItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('central_items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("central_id")->unsigned();
            $table->string('item_slug');
            $table->string("item_name");
            $table->integer('items')->unsigned()->default(0);
            $table->integer("total_items")->unsigned()->default(0);
            $table->string('comment')->nullable();
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
        Schema::dropIfExists('central_items');
    }
}
