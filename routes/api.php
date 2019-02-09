<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*
Route::get('/users', ['uses' => 'UserController@index']);
Route::post('/users', ['uses' => 'UserController@store']);
Route::put('/users/{id}', ['uses' => 'UserController@update']);
Route::delete('/users/{id}', ['uses' => 'UserController@destroy']);
*/
Route::apiResources([
	'users' => 'UserController',
]);

