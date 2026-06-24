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
        $rows = [
            [
                'id' => 1,
                'name' => 'Evander Wines',
                'email' => 'winesevander4@gmail.com',
                'role' => 'ADMINISTRATOR',
                'role_id' => '',
                'email_verified_at' => null,
                'password' => '$2y$12$gnTw27s7FXentaz/DF.mHuP9vFgsPeAu8AbTjTX8.vwTim1jqdAse',
                'remember_token' => null,
                'created_at' => '2025-11-25 18:04:19',
                'updated_at' => '2025-11-25 18:04:19',
            ],
            [
                'id' => 2,
                'name' => 'Samanseso',
                'email' => 'sample@driver',
                'role' => 'DRIVER',
                'role_id' => 'DRV-1001',
                'email_verified_at' => null,
                'password' => '$2y$12$gnTw27s7FXentaz/DF.mHuP9vFgsPeAu8AbTjTX8.vwTim1jqdAse',
                'remember_token' => null,
                'created_at' => '2025-12-03 03:14:22',
                'updated_at' => '2025-12-03 03:14:22',
            ],
            [
                'id' => 3,
                'name' => 'Admin',
                'email' => 'sample@admin1',
                'role' => 'ADMINISTRATOR',
                'role_id' => null,
                'email_verified_at' => null,
                'password' => '$2y$12$gnTw27s7FXentaz/DF.mHuP9vFgsPeAu8AbTjTX8.vwTim1jqdAse',
                'remember_token' => null,
                'created_at' => '2026-01-21 01:56:54',
                'updated_at' => '2026-01-21 01:56:54',
            ],
        ];

        foreach ($rows as $row) {
            DB::table('users')->updateOrInsert(
                ['id' => $row['id']],
                [
                    'name' => $row['name'],
                    'email' => $row['email'],
                    'role' => $row['role'],
                    'role_id' => $row['role_id'],
                    'email_verified_at' => $row['email_verified_at'],
                    'password' => $row['password'],
                    'remember_token' => $row['remember_token'],
                    'created_at' => $row['created_at'],
                    'updated_at' => $row['updated_at'],
                ]
            );
        }

        $this->syncPostgresSequence();
    }

    private function syncPostgresSequence(): void
    {
        if (DB::connection()->getDriverName() !== 'pgsql') {
            return;
        }

        DB::statement("SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 1), true)");
    }
}
