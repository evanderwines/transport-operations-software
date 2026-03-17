
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');



Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('dashboard', function (Request $request) {
        $role = $request->user()->role;

        if ($role === 'ADMINISTRATOR') {
            return Inertia::render('admin/dashboard');
        } elseif ($role === 'DRIVER') {
            
            return Inertia::render('driver/dashboard');
        } elseif ($role == 'CUSTOMER') {
            return Inertia::render('customer/dashboard');
        }
        else {
            abort(403, 'Unauthorized');
        }
    })->name('dashboard');
});

if (config('app.debug')) {
    Route::get('__auth_debug', function (Request $request) {
        $token = $request->cookie('auth_token');
        $pat = $token ? \Laravel\Sanctum\PersonalAccessToken::findToken($token) : null;

        return response()->json([
            'path' => $request->path(),
            'has_cookie' => $request->cookies->has('auth_token'),
            'cookie_len' => $token ? strlen((string) $token) : 0,
            'has_auth_header' => $request->headers->has('Authorization'),
            'auth_sanctum_user_id' => auth('sanctum')->user()?->id,
            'auth_web_user_id' => auth('web')->user()?->id,
            'token_found' => (bool) $pat,
            'token_id' => $pat?->id,
            'token_name' => $pat?->name,
            'token_expires_at' => $pat?->expires_at?->toIso8601String(),
            'token_last_used_at' => $pat?->last_used_at?->toIso8601String(),
        ]);
    });
}


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/user.php';
require __DIR__.'/reservations.php';
require __DIR__.'/active-dispatches.php';
require __DIR__.'/fleet.php';
require __DIR__.'/task.php';

require __DIR__.'/my-reservations.php';
require __DIR__.'/my-active-reservations.php';
