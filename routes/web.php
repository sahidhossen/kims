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

Route::get('/update_central', 'KitItemController@updateCentralItems');

Route::get('{reactRoutes}', function () {
    return view('home');
})->where('reactRoutes', '^((?!api).)*$'); // except 'api', 'login' word

Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
