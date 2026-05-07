<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('api')) {
            Schema::create('api', function (Blueprint $table) {
                $table->engine = 'InnoDB';
                $table->charset = 'latin1';
                $table->collation = 'latin1_swedish_ci';

                $table->string('api_id', 20)->primary();
                $table->string('property_name', 100);
                $table->text('property_value')->nullable();
            });

            DB::table('api')->insert([
                [
                    'api_id' => 'API-1001',
                    'property_name' => 'Map API Key',
                    'property_value' => '0ff16599-5a92-4b5a-8bed-d051d277d043',
                ],
                [
                    'api_id' => 'API-1002',
                    'property_name' => 'Map Template Path',
                    'property_value' => 'file:///C:/Users/U%20S%20E%20R%20-%20P%20C/source/repos/Transport_Operations_Software/MapTemplate.html',
                ],
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api');
    }
};
