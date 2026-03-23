<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

Route::post('login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required', 'string'],
        'remember' => ['nullable', 'boolean'],
    ]);
    $remember = (bool) ($credentials['remember'] ?? false);

    $user = User::where('email', $credentials['email'])->first();

    if (! $user || ! Hash::check($credentials['password'], $user->password)) {
        throw ValidationException::withMessages([
            'email' => __('auth.failed'),
        ]);
    }

    $token = $user->createToken('web')->plainTextToken;

    return response()
        ->json([
            'token' => $token,
            'user' => $user,
        ])
        ->withCookie(cookie(
            name: 'auth_token',
            value: $token,
            minutes: $remember ? 43200 : 120,
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'Lax'
        ));
});

Route::middleware('auth:sanctum')->post('logout', function (Request $request) {
    $request->user()->currentAccessToken()?->delete();

    return response()
        ->noContent()
        ->withCookie(cookie()->forget('auth_token'));
});

Route::middleware('auth:sanctum')->get('me', function (Request $request) {
    return response()->json($request->user());
});
