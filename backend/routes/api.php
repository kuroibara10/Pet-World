<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DemandController;
use App\Http\Controllers\DemandProductController;
// use App\Http\Controllers\DemandsController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;


Route::apiResource('userss',UsersController::class);
// Route::apiResource('demands',DemandsController::class);
Route::apiResource('products',ProductsController::class);
Route::apiResource('messages',MessagesController::class);

Route::post('/login', [AuthController::class, 'login']);


Route::apiResource('demands',DemandController::class);
Route::apiResource('demands/{demandId}/products',DemandProductController::class);



// ✅ تسجيل الخروج (يتطلب مصادقة المستخدم)
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// ✅ استرجاع بيانات المستخدم الحالي (مثال)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

Route::post('/userss/update-profile-image/{id}', [UsersController::class, 'updateProfileImage']);
Route::post('/userss/update-password/{id}', [UsersController::class, 'updatePassword'])->middleware('auth');

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});
