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



// Auth
Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::get('logout')->name('logout')->uses('Auth\LoginController@logout');

// Dashboard
Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth');


//Dispositivos
Route::post('device/create')->name('device.store')->uses('DevicesController@store')->middleware('auth');
Route::get('devices')->name('devices')->uses('DevicesController@index')->middleware('remember', 'auth');

//Geocercas
Route::post('geocerca/create')->name('geocerca.store')->uses('GeocercasController@store')->middleware('auth');

//Historial
Route::get('history/get/{date_i}/{date_f}/{device}')->name('history.get')->uses('GpstracksController@get')->middleware('auth');

//Administracion
Route::get('/management')->name('management')->uses('ManagementController')->middleware('auth');


/**
 * Groups Routes
 */
Route::group(['prefix' => 'groups'], function() {
    Route::get('')->name('groups')->uses('GroupsController@index')->middleware('remember', 'auth');
    Route::get('create')->name('groups.create')->uses('GroupsController@create')->middleware('auth');
    Route::post('')->name('groups.store')->uses('GroupsController@store')->middleware('auth');
    Route::get('{group}/edit')->name('groups.edit')->uses('GroupsController@edit')->middleware('auth');
    Route::put('{group}')->name('groups.update')->uses('UsersController@update')->middleware('auth');
    Route::delete('{group}')->name('groups.destroy')->uses('UsersController@destroy')->middleware('auth');
    Route::put('{group}/restore')->name('groups.restore')->uses('UsersController@restore')->middleware('auth');
});


/**
 * Roles Routes
 */
Route::group(['prefix' => 'roles'], function() {
    Route::get('')->name('roles')->uses('RolesController@index')->middleware('remember', 'auth');
    Route::get('create')->name('roles.create')->uses('RolesController@create')->middleware('auth');
    Route::post('')->name('roles.store')->uses('RolesController@store')->middleware('auth');
    Route::get('{rol}/edit')->name('roles.edit')->uses('RolesController@edit')->middleware('auth');
    Route::put('{rol}')->name('roles.update')->uses('RolesController@update')->middleware('auth');
    Route::get('{rol}/permissions')->name('roles.permissions')->uses('RolesController@permissions')->middleware('auth');
    Route::delete('{rol}')->name('roles.destroy')->uses('RolesController@destroy')->middleware('auth');
    Route::put('{rol}/restore')->name('roles.restore')->uses('RolesController@restore')->middleware('auth');
});


/**
 * User Routes
 */
Route::group(['prefix' => 'users'], function() {
    Route::get('')->name('users')->uses('UsersController@index')->middleware('remember', 'auth');
    Route::get('create')->name('users.create')->uses('UsersController@create')->middleware('auth');
    Route::post('users')->name('users.store')->uses('UsersController@store')->middleware('auth');
    Route::get('{user}/edit')->name('users.edit')->uses('UsersController@edit')->middleware('auth');
    Route::put('{user}')->name('users.update')->uses('UsersController@update')->middleware('auth');
    Route::delete('{user}')->name('users.destroy')->uses('UsersController@destroy')->middleware('auth');
    Route::put('{user}/restore')->name('users.restore')->uses('UsersController@restore')->middleware('auth');
});


// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');


/**
 * Organizations Routes
 */
Route::group(['prefix' => 'organizations'], function() {
    Route::get('')->name('organizations')->uses('OrganizationsController@index')->middleware('remember', 'auth');
    Route::get('create')->name('organizations.create')->uses('OrganizationsController@create')->middleware('auth');
    Route::post('')->name('organizations.store')->uses('OrganizationsController@store')->middleware('auth');
    Route::get('{organization}/edit')->name('organizations.edit')->uses('OrganizationsController@edit')->middleware('auth');
    Route::put('{organization}')->name('organizations.update')->uses('OrganizationsController@update')->middleware('auth');
    Route::delete('{organization}')->name('organizations.destroy')->uses('OrganizationsController@destroy')->middleware('auth');
    Route::put('{organization}/restore')->name('organizations.restore')->uses('OrganizationsController@restore')->middleware('auth');
});


/**
 * Drivers Routes
 */
Route::group(['prefix' => 'drivers'], function() {
    Route::get('')->name('drivers')->uses('DriversController@index')->middleware('remember', 'auth');
    Route::get('create')->name('drivers.create')->uses('DriversController@create')->middleware('auth');
    Route::post('')->name('drivers.store')->uses('DriversController@store')->middleware('auth');
    Route::get('{organization}/edit')->name('drivers.edit')->uses('DriversController@edit')->middleware('auth');
    Route::put('{organization}')->name('drivers.update')->uses('DriversController@update')->middleware('auth');
    Route::delete('{organization}')->name('drivers.destroy')->uses('DriversController@destroy')->middleware('auth');
    Route::put('{organization}/restore')->name('drivers.restore')->uses('DriversController@restore')->middleware('auth');
});


/**
 * Contacts Routes
 */
Route::group(['prefix' => 'contacts'], function() {
    Route::get('')->name('contacts')->uses('ContactsController@index')->middleware('remember', 'auth');
    Route::get('create')->name('contacts.create')->uses('ContactsController@create')->middleware('auth');
    Route::post('')->name('contacts.store')->uses('ContactsController@store')->middleware('auth');
    Route::get('{contact}/edit')->name('contacts.edit')->uses('ContactsController@edit')->middleware('auth');
    Route::put('{contact}')->name('contacts.update')->uses('ContactsController@update')->middleware('auth');
    Route::delete('{contact}')->name('contacts.destroy')->uses('ContactsController@destroy')->middleware('auth');
    Route::put('{contact}/restore')->name('contacts.restore')->uses('ContactsController@restore')->middleware('auth');
});


// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});
