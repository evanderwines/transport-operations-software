<?php

namespace Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->bigInteger('id')->nullable();
            $table->string('queue', 255)->nullable();
            $table->longText('payload')->nullable(false);
            $table->tinyInteger('attempts')->nullable();
            $table->integer('reserved_at')->nullable();
            $table->integer('available_at')->nullable();
            $table->integer('created_at')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}