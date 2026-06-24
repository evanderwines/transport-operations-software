<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            ApiSeeder::class,
            CacheSeeder::class,
            CustomersSeeder::class,
            DispatchesSeeder::class,
            DriversSeeder::class,
            UsersSeeder::class,
            LogsSeeder::class,
            MigrationsSeeder::class,
            PaymentsSeeder::class,
            PricingSeeder::class,
            ReservationsSeeder::class,
            SessionsSeeder::class,
            VehiclesSeeder::class
        ]);
    }
}
