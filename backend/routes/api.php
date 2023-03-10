<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PetitionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');

});



Route::controller(UserController::class)->group(function(){
    Route::get('user/{user}', 'show');
    Route::get('user', 'user');
});

Route::get('/users/firmas', [
    \App\Http\Controllers\UserController::class,
    'peticionesFirmadas'
]);

Route::controller(CategoryController::class)->group(function(){
    Route::post('storeCategory', 'storeCategory');
    Route::get('category/{category}', 'show');
    Route::get('category', 'show_all');
});


Route::controller(PetitionController::class)->group(function(){
    Route::get('get/{id}', 'getById');
    Route::post('store/peticion', 'store');
    Route::get('mispeticiones', 'listMine');
    Route::delete('petition/{id}', 'destroy');
    Route::put('petitionUpdate/{id}', 'update');
    Route::get('peticiones/listado', 'list');
    Route::get('peticiones/firmar/{id}', 'firmar');
    Route::get('peticiones/cambiarEstado/{id}', 'cambiarEstado');
    Route::get('peticiones/{id}', 'show');
});


Route::resource('peticiones',\App\Http\Controllers\PetitionController::class);
