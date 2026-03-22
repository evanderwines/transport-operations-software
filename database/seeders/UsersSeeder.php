<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Populates the users table with initial data.
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'Evander Wines',
                'email' => 'winesevander@gmail.com',
                'role' => 'ADMINISTRATOR',
                'role_id' => '',
                'email_verified_at' => null,
                'password' => '$2y$12$bGIhgaRMtr0Pz3T0hH.3wObSW1CNYTe8qJb8HC.ivvO25ucnqe1Tm',
                'remember_token' => null,
                'created_at' => '2025-11-25 18:04:19',
                'updated_at' => '2026-03-06 07:44:30'
            ],
            [
                'id' => 2,
                'name' => 'Samanseso',
                'email' => 'sample@driver',
                'role' => 'DRIVER',
                'role_id' => 'DRV-1001',
                'email_verified_at' => null,
                'password' => '$2y$12$Wa3uEY8xg9BA0IW.epA/UewkRjtg0ehSi8lKCZgC79caYc3OpSsaC',
                'remember_token' => null,
                'created_at' => '2025-12-03 03:14:22',
                'updated_at' => '2025-12-03 03:14:22'
            ],
            [
                'id' => 3,
                'name' => 'Admin',
                'email' => 'sample@admin',
                'role' => 'ADMINISTRATOR',
                'role_id' => null,
                'email_verified_at' => null,
                'password' => '$2y$12$18.WS6UOmFxaSxPyAKsB.eYEzAIwMLlPOAdfYPaSKG10.aGOAOQ4u',
                'remember_token' => null,
                'created_at' => '2026-01-21 01:56:54',
                'updated_at' => '2026-01-21 01:56:54'
            ],
            [
                'id' => 4,
                'name' => 'Test',
                'email' => 'sample@user.com',
                'role' => 'CUSTOMER',
                'role_id' => null,
                'email_verified_at' => null,
                'password' => '$2y$12$uqVrT6x491hG5JQ7mLaAbeeGMuqQtYRhrKIUSRpeZpD7ZLF8WF.Ii',
                'remember_token' => null,
                'created_at' => '2026-03-02 02:25:52',
                'updated_at' => '2026-03-02 02:25:52'
            ],
            [
                'id' => 5,
                'name' => 'test',
                'email' => 'sample2@customer.com',
                'role' => 'CUSTOMER',
                'role_id' => null,
                'email_verified_at' => null,
                'password' => '$2y$12$jR1HtR2EHyf9DnvxqVoMTecQcsXUJURCuq3At.2xn/NiX9rOdRCcC',
                'remember_token' => null,
                'created_at' => '2026-03-02 02:30:20',
                'updated_at' => '2026-03-02 02:30:20'
            ]
        ]);
    }
}