<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/test', 'MessagesController@pusher');
Route::post('pusher/test', 'WebController@pusherAuth');
Route::post('pusher/api', 'ApiController@pusherAuth');

//Socket.IO Routes
Route::get('socketio', function () {
    event(new App\Events\SocketMessageEvent());
    return "event fired";
});

Route::get('test', function () {
    return view('test');
});