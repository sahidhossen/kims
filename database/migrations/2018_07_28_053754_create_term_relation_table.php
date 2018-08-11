<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTermRelationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('term_relation', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('term_type')->default(0)->comment('0=solder, 1=condemnation');
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('central_office_id')->unsigned()->nullable();
            $table->integer('district_office_id')->unsigned()->nullable();
            $table->integer('unit_id')->unsigned()->nullable();
            $table->integer('company_id')->unsigned()->nullable();
            $table->string('comments')->nullable();
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
        Schema::dropIfExists('term_relation');
    }
}
