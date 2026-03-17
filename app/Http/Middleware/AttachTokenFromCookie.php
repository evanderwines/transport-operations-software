<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AttachTokenFromCookie
{
    /**
     * Attach a bearer token from the auth_token cookie if Authorization is missing.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->headers->has('Authorization')) {
            $token = $request->cookie('auth_token');

            if ($token) {
                $request->headers->set('Authorization', 'Bearer '.$token);
            }
        }

        if (config('app.debug')) {
            \Log::debug('AttachTokenFromCookie', [
                'path' => $request->path(),
                'has_cookie' => $request->cookies->has('auth_token'),
                'has_auth_header' => $request->headers->has('Authorization'),
                'cookie_len' => $request->cookie('auth_token') ? strlen((string) $request->cookie('auth_token')) : 0,
            ]);
        }

        return $next($request);
    }
}
