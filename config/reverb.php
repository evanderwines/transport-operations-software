<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Reverb Server
    |--------------------------------------------------------------------------
    |
    | This option controls the default server used by Reverb to handle
    | incoming messages as well as broadcasting message to all your
    | connected clients. At this time only "reverb" is supported.
    |
    */

    'default' => env('REVERB_SERVER', 'reverb'),

    /*
    |--------------------------------------------------------------------------
    | Reverb Servers
    |--------------------------------------------------------------------------
    |
    | Here you may define details for each of the supported Reverb servers.
    | Each server has its own configuration options that are defined in
    | the array below. You should ensure all the options are present.
    |
    */

    'servers' => [

        'reverb' => [
            'host' => '0.0.0.0',
            'port' => env('PORT', 10000),
            'path' => '',
            'hostname' => 'transport-operations-ws.onrender.com',

            'options' => [
                'tls' => [],
            ],

            'max_request_size' => 10000,

            'scaling' => [
                'enabled' => false,
            ],

            'pulse_ingest_interval' => 15,
            'telescope_ingest_interval' => 15,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Reverb Applications
    |--------------------------------------------------------------------------
    |
    | Here you may define how Reverb applications are managed. If you choose
    | to use the "config" provider, you may define an array of apps which
    | your server will support, including their connection credentials.
    |
    */


    'apps' => [

        'provider' => 'config',

        'apps' => [
            [
                'key' => 'cfvbmtogk4rzm2nh7ijt',
                'secret' => 'reverb-secret',
                'app_id' => 'reverb-app',

                'options' => [
                    'host' => 'transport-operations-ws.onrender.com',
                    'port' => 443,
                    'scheme' => 'https',
                    'useTLS' => true,
                ],

                'allowed_origins' => ['*'],
                'ping_interval' => 60,
                'activity_timeout' => 30,
                'max_connections' => null,
                'max_message_size' => 10000,
            ],
        ],

    ],

];
