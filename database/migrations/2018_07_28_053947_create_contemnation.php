<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContemnation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('condemnations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('term_id')->unsigned()->comment('type=0');
            $table->string('condemnation_name');
            $table->integer('status')->default(0);
            $table->dateTime('finish_date');
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
        Schema::dropIfExists('condemnations');
    }
}
