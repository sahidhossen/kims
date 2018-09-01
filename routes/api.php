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
 * User Authentication
 */
Route::middleware('auth:api')->get('/kit_user', 'UserController@getKitUser');
Route::middleware('auth:api')->get('/kit_solder', 'UserController@getKitSolder'); // After auth from mobile device
Route::middleware('auth:api')->get('/kit_items_by_solder_id', 'UserController@getKitItemBySolderId'); // After auth from mobile device

Route::middleware('auth:api')->get('/kit_users', 'UserController@getAllKitUser');
Route::middleware('auth:api')->post('/kit_user_register', 'UserController@userRegister');
Route::middleware('auth:api')->get('/kit_user_by_id', 'UserController@userById');
Route::middleware('auth:api')->post('/kit_user_update', 'UserController@updateUser');
Route::middleware('auth:api')->post('/update_user_role', 'UserController@updateOrAddRole');

Route::middleware('auth:api')->get('/get_roles', 'UserController@getRoles');
Route::middleware('auth:api')->get('/get_kit_controllers', 'KitController@getKitControllers');

/*
 * Central Office API
 */
Route::middleware('auth:api')->post('/add_central_office', 'CentralController@store');
Route::middleware('auth:api')->post('/update_central_office', 'CentralController@update');
Route::middleware('auth:api')->post('/delete_central_office', 'CentralController@delete');
Route::middleware('auth:api')->get('/central_offices', 'CentralController@getAllCentralOffice');
Route::middleware('auth:api')->get('/central_office', 'CentralController@getCentralOfficeById');



/*
 * District Office API
 */
Route::middleware('auth:api')->post('/add_district_office', 'DistrictController@store');
Route::middleware('auth:api')->post('/update_district_office', 'DistrictController@update');
Route::middleware('auth:api')->post('/delete_district_office', 'DistrictController@delete');
Route::middleware('auth:api')->get('/district_offices', 'DistrictController@getAllDistrictOffice');
Route::middleware('auth:api')->get('/district_office', 'DistrictController@getDistrictOfficeById');



/*
 * UNIT API
 */
Route::middleware('auth:api')->post('/add_unit', 'UnitController@store');
Route::middleware('auth:api')->post('/update_unit', 'UnitController@update');
Route::middleware('auth:api')->post('/delete_company_office', 'UnitController@delete');
Route::middleware('auth:api')->get('/units', 'UnitController@getAllUnit');
Route::middleware('auth:api')->get('/unit', 'UnitController@getUnitById');


/*
 * Company API
 */
Route::middleware('auth:api')->post('/add_company', 'CompanyController@store');
Route::middleware('auth:api')->post('/update_company_office', 'CompanyController@update');
Route::middleware('auth:api')->post('/delete_company_office', 'CompanyController@delete');
Route::middleware('auth:api')->get('/companies', 'CompanyController@getAllCompany');
Route::middleware('auth:api')->get('/company', 'CompanyController@getCompanyById');


/*
 * Add kit item types
 */

Route::middleware('auth:api')->post('/add_item_type', 'ItemTypeController@store');
Route::middleware('auth:api')->post('/update_item_type', 'ItemTypeController@update');
Route::middleware('auth:api')->get('/item_types', 'ItemTypeController@fetchAll');
Route::middleware('auth:api')->get('/item_type', 'ItemTypeController@itemById');

/*
 * Item Kits
 */

Route::middleware('auth:api')->post('/add_kit_item', 'KitItemController@store');
Route::middleware('auth:api')->post('/update_kit_item', 'KitItemController@update');
Route::middleware('auth:api')->get('/kit_items_by_central_office', 'KitItemController@kitItemsByQuery');
Route::middleware('auth:api')->get('/kit_item', 'KitItemController@itemById');
Route::middleware('auth:api')->get('/kit_items', 'KitItemController@getAllKitItems');
Route::middleware('auth:api')->post('/delete_kit_item', 'KitItemController@delete');


Route::middleware('auth:api')->post('/assign_kit_item', 'UserController@assignKitItemToSolder');

/*
 * Request API's
 */

Route::middleware('auth:api')->get('/company_pending_request', 'ItemRequestController@solderPendingRequest');
Route::middleware('auth:api')->post('/request_solder_to_company', 'ItemRequestController@SolderRequest');
Route::middleware('auth:api')->post('/request_solder_to_company_cancel', 'ItemRequestController@cancelRequest');
Route::middleware('auth:api')->post('/request_solder_to_company_approve', 'ItemRequestController@approveRequest');

Route::middleware('auth:api')->post('/request_company_to_unit', 'ItemRequestController@requestCompanyToUnit');
Route::middleware('auth:api')->get('/get_unit_level_request', 'ItemRequestController@unitLevelPendingRequest');
Route::middleware('auth:api')->get('/request_unit_to_district', 'ItemRequestController@requestUnitToDistrict');
/*
 * Condemnation  API's
 */
Route::middleware('auth:api')->post('/add_condemnation', 'CondemnationController@store');
Route::middleware('auth:api')->post('/delete_condemnation', 'CondemnationController@delete');
Route::middleware('auth:api')->get('/get_condemnations', 'CondemnationController@getCondemnations');
Route::middleware('auth:api')->get('/get_condemnation', 'CondemnationController@getCondemnationById');
Route::middleware('auth:api')->get('/get_condemnation_by_terms', 'CondemnationController@getCondemnationByQuery');
