<?php

use App\Http\Controllers\DemandsController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;


Route::apiResource('userss',UsersController::class);
Route::apiResource('demands',DemandsController::class);
Route::apiResource('products',ProductsController::class);
Route::apiResource('messages',MessagesController::class);



Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});
