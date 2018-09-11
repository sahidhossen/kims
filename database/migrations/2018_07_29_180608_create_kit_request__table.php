<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKitRequestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kit_item_request', function (Blueprint $table) {
            $table->increments('id');
            $table->string('parent_ids')->nullable();
            $table->integer('condemnation_id')->unsigned()->nullable();
            $table->integer('stage')->default(0)->comment('Describe which stage. 1st, 2nd or 3rd');
            $table->integer('central_user_id')->unsigned()->nullable()->comment('Central Level');
            $table->integer('district_user_id')->unsigned()->nullable()->comment('District Level');
            $table->integer('quarter_master_user_id')->unsigned()->nullable()->comment('Quarter Master level');
            $table->integer('unit_user_id')->unsigned()->nullable()->comment('Unit level');
            $table->integer('company_user_id')->unsigned()->nullable()->comment('Company level');
            /*
             * ids=> [{cat_name:category_name,kit_ids:"12,34,22"}, ....]
             */
            $table->text('kit_items')->nullable()->comment('kit_items ids with category seperted serialize');
            $table->text('approve_kit_items')->nullable()->comment('Approval kit items');
            $table->integer('request_items')->default(0);
            $table->integer('approval_items')->default(0);
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
        Schema::dropIfExists('kit_item_request');
    }
}
