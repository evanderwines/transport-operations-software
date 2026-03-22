<?php

namespace Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobBatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id', 255)->nullable();
            $table->string('name', 255)->nullable();
            $table->integer('total_jobs')->nullable();
            $table->integer('pending_jobs')->nullable();
            $table->integer('failed_jobs')->nullable();
            $table->longText('failed_job_ids')->nullable(false);
            $table->mediumText('options')->nullable();
            $table->integer('cancelled_at')->nullable();
            $table->integer('created_at')->nullable();
            $table->integer('finished_at')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_batches');
    }
}