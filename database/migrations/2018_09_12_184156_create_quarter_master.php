<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuarterMaster extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quarter_master', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('central_office_id')->unsigned();
            $table->integer('district_office_id')->unsigned();
            $table->string('quarter_name');
            $table->text('quarter_details')->nullable();
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
        Schema::dropIfExists('quarter_master');
    }
}
