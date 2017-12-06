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
    return view('vue_home');
})->name('homepage');

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

Route::get('/analyse', function(){
   return view('analyse');
})->name('analyse');

Route::get('/graph', function(){
    return view('graph');
})->name('graph');

Route::get('/play_game', function(){
    return view('play_game');
})->name('play_game');

Route::get('/instructions', function(){
    return view('instructions');
})->name('instructions');

Route::get('/contact', function(){
    return view('contact');
})->name('contact');

