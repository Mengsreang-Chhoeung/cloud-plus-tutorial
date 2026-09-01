<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $message = env('APP_MESSAGE', 'Hello from Run App!');

    return "<h1>{$message}</h1><p>Served by Laravel on Run App.</p>";
});

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
