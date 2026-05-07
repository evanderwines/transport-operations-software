<?php

use Illuminate\Auth\Events\Registered;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

Route::post('register', function (Request $request) {
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
        'password' => ['required', 'confirmed', Password::defaults()],
    ]);

    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'role' => 'CUSTOMER',
    ]);

    event(new Registered($user));

    $cookieToken = $request->cookie('auth_token');
    if ($cookieToken) {
        PersonalAccessToken::findToken($cookieToken)?->delete();
    }

    $token = $user->createToken('web')->plainTextToken;

    return response()
        ->json([
            'token' => $token,
            'user' => $user,
        ], 201)
        ->withCookie(cookie(
            name: 'auth_token',
            value: $token,
            minutes: 120,
            path: '/',
            secure: $request->isSecure(),
            httpOnly: true,
            sameSite: 'Lax'
        ));
});

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

    $cookieToken = $request->cookie('auth_token');
    if ($cookieToken) {
        PersonalAccessToken::findToken($cookieToken)?->delete();
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
            secure: $request->isSecure(),
            httpOnly: true,
            sameSite: 'Lax'
        ));
});

Route::middleware('auth:sanctum')->post('logout', function (Request $request) {
    $request->user()->currentAccessToken()?->delete();

    $cookieToken = $request->cookie('auth_token');
    if ($cookieToken) {
        PersonalAccessToken::findToken($cookieToken)?->delete();
    }

    Auth::guard('web')->logout();

    if ($request->hasSession()) {
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    return response()
        ->noContent()
        ->withCookie(cookie()->forget('auth_token'))
        ->withCookie(cookie()->forget(config('session.cookie')));
});

Route::middleware('auth:sanctum')->get('me', function (Request $request) {
    return response()->json($request->user());
});
