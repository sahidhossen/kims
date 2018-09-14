<?php

namespace App\Http\Controllers;

use App\CentralOffice;
use App\ItemType;
use App\KitItem;
use App\KitItemRequest;
use App\SolderKits;
use App\TermRelation;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use League\Flysystem\Exception;
use App\Role;

class UserController extends Controller
{
    /*
     * Get user information with role
     *
     */
    public function getKitUser(Request $request){
        try {
            $currentUser = $request->user();
            $currentUser->whoami = $currentUser->roles->first()->name;
            if( $currentUser->whoami == null )
                throw new Exception("User don't have any role");

            //unset($currentUser->roles); // Unset unncessary  code roles
            return [ 'success' => true, 'data' => $currentUser, 'message'=>'Current user information.'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }

    /*
     * get Kit Solder
     * Only for api request
     *
     */
    public function getKitSolder( Request $request ){
        try {
            $currentUser = $request->user();
            if ($currentUser->roles == null)
                throw new Exception("User don't have any role");

            $currentUser->whoami = $currentUser->roles->first()->name;
            $UserTerm = TermRelation::where('user_id', $currentUser->id)->first();
            $solderKit = SolderKits::where('user_id', $currentUser->id)
                ->where('status', '!=', 3)->orderByRaw('item_type_id ASC')->get();
            $items = [];
            $itemResult = [];
            if (count($solderKit) > 0) {
                foreach ($solderKit as $kit) {
                    $solderInformation = TermRelation::retrieveSolderTerms($kit->user_id);
                    $itemType = ItemType::find($kit->item_type_id);
                    $solderInformation->item_name = $itemType->type_name;
                    $solderInformation->problems = ($itemType->problems == null) ? [] : \GuzzleHttp\json_decode($itemType->problems);
                    $solderInformation->status = $kit->status;
                    $solderInformation->issue_date = $kit->issue_date;
                    $solderInformation->expire_date = $kit->expire_date;
                    $solderInformation->id = $kit->id;
                    $solderInformation->name = $currentUser->name;
                    $solderInformation->professional = $currentUser->professional;
                    $solderInformation->designation = $currentUser->designation;
                    $solderInformation->mobile = $currentUser->mobile;
                    $solderInformation->secret_id = $currentUser->secret_id;
                    $items[$itemType->type_name][] = $solderInformation;
                }
                if(count($items) > 0 ){
                    foreach($items as $key=>$item){
                        $newItem = [];
                        $newItem['item_name'] = $key;
                        $newItem['items'] = $item;
                        array_push($itemResult, $newItem);
                    }
                }

            }

            //Solder
            if ($currentUser->hasRole('solder')){
                $currentUser->company_id = $UserTerm->company_id;
                $currentUser->central_id = $UserTerm->central_office_id;
                $currentUser->formation_id = $UserTerm->district_office_id;
                $companyHead = TermRelation::getSolderCompanyHead($UserTerm->company_id);
                if($companyHead != null ){
                    $companyHeadInfo = new \stdClass();
                    $companyHeadInfo->device_id = $companyHead->device_id;
                    $companyHeadInfo->name = $companyHead->name;
                    $currentUser->company_head = $companyHeadInfo;
                }else{
                    $currentUser->company_head = null;
                }
            }

            // Company level Data
            $companySolders = [];
            if ($currentUser->hasRole('company')) {
                $currentUser->company_id = $UserTerm->company_id;
                $currentUser->unit_id = $UserTerm->unit_id;
                $currentUser->central_id = $UserTerm->central_office_id;
                $currentUser->formation_id = $UserTerm->district_office_id;
                $unit_info = TermRelation::getCompanyUnitUser($UserTerm->unit_id);
                if($unit_info){
                    $currentUser->unit_name = $unit_info->unit_name;
                    $currentUser->unit_user_name = $unit_info->name;
                    $currentUser->unit_device_id = $unit_info->device_id;
                }
                $companyTerms = TermRelation::retrieveCompanySoldersTerms($currentUser->id);
                if (count($companyTerms) > 0) {
                    foreach ($companyTerms as $term) {
                        $solder = User::find($term->user_id);
                        array_push($companySolders, $solder);
                    }
                }

            }


            // Unit level data
            $unitCompanies = [];
            if($currentUser->hasRole('unit')){
                $currentUser->unit_id = $UserTerm->unit_id;
                $currentUser->central_id = $UserTerm->central_office_id;
                $currentUser->formation_id = $UserTerm->district_office_id;
                $district_info = TermRelation::retrieveUnitDistrict($UserTerm->district_office_id);
                if($district_info){
                    $currentUser->formation_name = $district_info->district_name;
                    $currentUser->formation_user_name = $district_info->name;
                    $currentUser->formation_device_id = $district_info->device_id;
                }
                $unitTerms = TermRelation::retrieveUnitCompaniesTerms( $currentUser->id );
                if( count( $unitTerms) > 0 ){
                    foreach( $unitTerms as $term ){
                        $user = User::find( $term->user_id );
                         if(!$user){
                            continue;
                         }
                            if($user->hasRole('company')) {
                                $user->company_id = $term->company_id;
                                $user->unit_id = $term->unit_id;
                                $company = TermRelation::getCompanyInfoByUserId($user->id);
                                $user->company_name = $company == null ? null : $company->company_name;
                                array_push($unitCompanies, $user);
                            }
                        }
                    }

            }


            //Formation level data
            $districtUnits = [];
            if($currentUser->hasRole('formation')){
                $currentUser->formation_id = $UserTerm->district_office_id;
                $currentUser->central_id = $UserTerm->central_office_id;
                $central_info = TermRelation::retrieveDistrictCentral($UserTerm->central_office_id);
                if($central_info){
                    $currentUser->cental_name = $central_info->central_name;
                    $currentUser->central_user_name = $central_info->name;
                    $currentUser->central_device_id = $central_info->device_id;
                }
                $unitTerms = TermRelation::retrieveDistrictUnitsTerms( $currentUser->id );
                if( count( $unitTerms) > 0 ){
                    foreach( $unitTerms as $term ){
                        $user = User::find( $term->user_id );
                        if($user->hasRole('unit')) {
                            $user->district_office_id = $term->district_office_id;
                            $user->unit_id = $term->unit_id;
                            $unit = TermRelation::getUnitInfoByUserId($user->id);
                            $user->unit_name = $unit->unit_name;
                            array_push($districtUnits, $user);
                        }
                    }
                }
            }

            //Central level data
            $centralFormations = [];
            if($currentUser->hasRole('central')){
                $currentUser->central_id = $UserTerm->central_office_id;
                $unitTerms = TermRelation::retrieveCentralDistrictTerms( $currentUser->id );
                if( count( $unitTerms) > 0 ){
                    foreach( $unitTerms as $term ){
                        $user = User::find( $term->user_id );
                        if($user->hasRole('formation')) {
                            $user->central_office_id = $term->central_office_id;
                            $user->district_office_id = $term->district_office_id;
                            $user->unit_id = $term->unit_id;
                            array_push($centralFormations, $user);
                        }
                    }
                }
            }

            return [
                'success' => true,
                'solders'=>$companySolders,
                'unit_companies'=>$unitCompanies,
                'formation_units'=>$districtUnits,
                'central_formations'=>$centralFormations,
                'items' => $itemResult,
                'data'=>$currentUser,
                'message'=>'Current user information.'
            ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }

    }


    /*
     * Get kit Items by solder id
     * When user login as a company and get all solder
     * then each solder needs their items
     */
    public function getKitItemBySolderId(Request $request){
        try{
            if(!$request->input('user_id') )
                throw new Exception("Must be need user ID");
            $currentUser = User::find( $request->input('user_id') );
            $solderKit = SolderKits::where('user_id',$currentUser->id )
                ->where('status','!=',3)->get();
            $items = [];
            $itemResult = [];
            if (count($solderKit) > 0) {
                foreach ($solderKit as $kit) {
                    $solderInformation = TermRelation::retrieveSolderTerms($kit->user_id);
                    $itemType = ItemType::find($kit->item_type_id);
                    $solderInformation->item_name = $itemType->type_name;
                    $solderInformation->problems = ($itemType->problems == null) ? [] : \GuzzleHttp\json_decode($itemType->problems);
                    $solderInformation->status = $kit->status;
                    $solderInformation->issue_date = $kit->issue_date;
                    $solderInformation->expire_date = $kit->expire_date;
                    $solderInformation->id = $kit->id;
                    $solderInformation->name = $currentUser->name;
                    $solderInformation->professional = $currentUser->professional;
                    $solderInformation->designation = $currentUser->designation;
                    $solderInformation->mobile = $currentUser->mobile;
                    $solderInformation->secret_id = $currentUser->secret_id;
                    $items[$itemType->type_name][] = $solderInformation;
                }
                if(count($items) > 0 ){
                    foreach($items as $key=>$item){
                        $newItem = [];
                        $newItem['item_name'] = $key;
                        $newItem['items'] = $item;
                        array_push($itemResult, $newItem);
                    }
                }

            }
            return [ 'success' => true, 'data' => $itemResult, 'message'=>'Current user information.'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }

    /*
     * Get kit Items by solder id
     * When user login as a company and get all solder
     * then each solder needs their items
     */
    public function getWebKitItemBySolderId(Request $request){
        try{
            if(!$request->input('user_id') )
                throw new Exception("Must be need user ID");
            $currentUser = User::find( $request->input('user_id') );
            $solderKit = SolderKits::where('user_id',$currentUser->id )
                ->where('status','!=',3)->get();
            $items = [];
            if (count($solderKit) > 0) {
                foreach ($solderKit as $kit) {
                    $solderInformation = TermRelation::retrieveSolderTerms($kit->user_id);
                    $itemType = ItemType::find($kit->item_type_id);
                    $solderInformation->item_name = $itemType->type_name;
                    $solderInformation->problems = ($itemType->problems == null) ? [] : \GuzzleHttp\json_decode($itemType->problems);
                    $solderInformation->status = $kit->status;
                    $solderInformation->issue_date = $kit->issue_date;
                    $solderInformation->expire_date = $kit->expire_date;
                    $solderInformation->id = $kit->id;
                    $solderInformation->name = $currentUser->name;
                    $solderInformation->professional = $currentUser->professional;
                    $solderInformation->designation = $currentUser->designation;
                    $solderInformation->mobile = $currentUser->mobile;
                    $solderInformation->secret_id = $currentUser->secret_id;
//                    $items[$itemType->type_name][] = $solderInformation;
                    array_push($items, $solderInformation);
                }

            }
            return [ 'success' => true, 'data' => $items, 'message'=>'Current user information.'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }

    /*
     * Fetch All kit users
     */
    public function getAllKitUser(){
        try{
            $users = User::all();
            $result = [];
            if( count($users ) > 0 ){
                foreach( $users as $user ){
                    if( $user->hasRole('kit_admin') )
                        continue;
                    $termRelation = TermRelation::where( 'user_id', $user->id )->first();
                    if(!$termRelation)
                        continue;
                    $centralOffice = CentralOffice::find($termRelation->central_office_id);
                    if(!$centralOffice)
                        continue;
                    if( $user->roles == null )
                        continue;
                    $user->whoami = $user->roles->first()->name;
                    $user->central_office_name = $centralOffice->central_name;
                    $user->central_office_id = $centralOffice->id;
                    array_push( $result, $user );
                }
            }
            return ['success'=>true, 'message'=>'Fetch all users without admin', 'data'=>$result ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage() ];
        }

    }

    public function getRoles(){
        try{
            $roles = Role::all();
            $result = [];
            foreach( $roles as $role ){
                if( $role->name == "kit_admin" )
                    continue;
                array_push($result, $role );
            }
            return ['success'=>true, 'data'=>$result, 'message'=>"All role fetched!"];
        }catch(Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }

    /*
     * Get user by id
     * @params( user_id )
     */
    public function userById(Request $request){
        try{
            $user = User::find( $request->input('user_id') );
            if(!$user)
                throw new Exception("User not found!");

            if( count($user->roles) === 0 )
                throw new Exception("User don't have any role!");
            if(!$user->hasRole('solder'))
                throw new Exception("Sorry this is not a solder");

            $user->whoami = $user->roles->first()->name;
                if( $user->whoami == null )
                    throw new Exception("User don't have any role");

            $termRelation = TermRelation::retrieveSolderTerms($user->id);
            if(!$termRelation)
                throw new Exception("User haven't any relation with central office ");

            $user->terms = $termRelation;

            return ['success'=>true, 'data'=>$user, 'message'=>"User found!"];
        }catch(Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
    /*
     * Register User
     */
    public function userRegister(Request $request){
        try {
            $currentUser = $request->user();
            $currentUser->whoami = $currentUser->roles->first()->name;
            if( $currentUser->whoami == null )
                throw new Exception("User don't have any role");

            $currentRoles = config('kims.solder_roles');

            if( !in_array( $request->input('role'), $currentRoles))
                throw new Exception("Provided user role invalid. Role should be between ".implode(', ', config('kims.solder_roles')));

            $validator = Validator::make($request->all(), [
                'secret_id' => 'required|unique:users',
                'password' => 'required',
                'name' => 'required|min:5',
                'designation' => 'required|min:2',
                'mobile' => 'required|min:8'
            ]);

            if( $validator->fails()){
                $validatorErrors = [];
                foreach($validator->messages()->getMessages() as $fieldName => $messages) {
                    foreach( $messages as $message){
                        $validatorErrors[$fieldName] = $message;
                    }
                }
                throw new Exception(implode(' ',$validatorErrors));
            }

            $user = new User();
            $user->name = $request->input('name');
            $user->professional = $request->input('professional');
            $user->designation = $request->input('designation');
            $user->mobile = $request->input('mobile');
            $user->secret_id = $request->input('secret_id');
            $user->password = bcrypt($request->input('password'));

            if(!$user->save())
                throw new Exception('Critical error when want to user save!');

            $setRole = $user->setRole( $request->input('role'));
            if( $setRole === false )
                throw new Exception('Critical error on add user role!');

            if(TermRelation::isRelativeExists($user->id, 0 ) === false ){
                $relationTableData = [];
                $relationTableData['central_office_id'] = $request->input('central_office_id');
                $relationTableData['district_office_id'] = $request->input('district_office_id');
                $relationTableData['unit_id'] = $request->input('unit_id');
                $relationTableData['company_id'] = $request->input('company_id');
                $relationTableData['user_id'] = $user->id;

                $relationTableData['role'] = $this->getRoleIdentity($request->input('role'));

                TermRelation::createRelation( $relationTableData );
            }
            $user->whoami = $request->input('role');
            return [ 'success' => true, 'data' => $user, 'message'=>'Add user successfully!'];
        }catch(Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }


    private function getRoleIdentity($roleName){
        $roleIdentity = 0;
        if($roleName === 'kim_admin' )
            $roleIdentity = 0;
        if($roleName === 'central' )
            $roleIdentity = 1;
        if($roleName === 'formation' )
            $roleIdentity = 2;
        if($roleName === 'quarter_master')
            $roleIdentity = 6;
        if($roleName === 'unit' )
            $roleIdentity = 3;
        if($roleName === 'company' )
            $roleIdentity = 4;
        if($roleName === 'solder' )
            $roleIdentity = 5;
        return $roleIdentity;
    }

    /*
     * Update or add user role
     */
    public function updateOrAddRole( Request $request ){
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required',
                'new_role' => 'required'
            ]);
            if( $validator->fails()){
                $validatorErrors = [];
                foreach($validator->messages()->getMessages() as $fieldName => $messages) {
                    foreach( $messages as $message){
                        $validatorErrors[$fieldName] = $message;
                    }
                }
                throw new Exception(implode(' ',$validatorErrors));
            }
            if( !in_array( $request->input('new_role'), config('kims.solder_roles')))
                throw new Exception("Provided user role invalid. Role should be between ".implode(', ', config('kims.solder_roles')));

            $user = User::find( $request->input('user_id'));

            if(!$user)
                throw new Exception("You provide invalid user ID!");
            if( $user->hasRole($request->input('new_role')))
                throw new Exception("Already has this role!");

            $user->deferAndAttachNewRole($user, $request->input('new_role'));

            return ['success'=>true, "message"=> "Role has been updated" ];

        }catch(Exception $e ){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }

    public function updateUser( Request $request ) {
        try {
            if(! $request->input('user_id') )
                throw new Exception("Must be need user_id!");

            $user = User::find( $request->input('user_id'));

            $secret_id = $request->input('secret_id');
            if($user->secret_id == $secret_id )
                throw new Exception("Cannot update same secret ID!");

            $validator = Validator::make($request->all(), [
                'secret_id' => 'required|unique:users,secret_id,'.$user->id
            ]);

            if( $validator->fails()){
                $validatorErrors = [];
                foreach($validator->messages()->getMessages() as $fieldName => $messages) {
                    foreach( $messages as $message){
                        $validatorErrors[$fieldName] = $message;
                    }
                }
                throw new Exception(implode(' ',$validatorErrors));
            }

            $user->secret_id = $secret_id;
            $user->name = $request->input('name') ? $request->input('name') : $user->name;
            $user->professional = $request->input('professional') ? $request->input('professional') : $user->professional;
            $user->designation = $request->input('designation') ? $request->input('designation') : $user->designation;
            $user->mobile = $request->input('mobile') ? $request->input('mobile') : $user->mobile;

            if(!$user->save())
                throw new Exception("Critical error on user update!");

            return ['success'=>true, 'message'=>"User update successful!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }

    /*
     * Assign kit item to solder
     */
    public function assignKitItemToSolder(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'user_id' => 'required',
                'item_id' => 'required',
                'item_type_id' => 'required',
                'issue_date' => 'required',
                'expire_date' => 'required'
            ]);
            if( $validator->fails()){
                $validatorErrors = [];
                foreach($validator->messages()->getMessages() as $fieldName => $messages) {
                    foreach( $messages as $message){
                        $validatorErrors[$fieldName] = $message;
                    }
                }
                throw new Exception(implode(' ',$validatorErrors));
            }

            $solderKit = new SolderKits();
            $solderKit->user_id = $request->input('user_id');
            $solderKit->item_id = $request->input('item_id');
            $solderKit->item_type_id = $request->input('item_type_id');
            $solderKit->issue_date = $request->input('issue_date');
//            $effectiveDate = date('Y-m-d h:m:s', strtotime('+3 month'));
            $solderKit->expire_date = $request->input('expire_date');

            $solderKit->save();

            $kitItem = KitItem::find( $solderKit->item_id );
            $kitItem->status = 1;
            $kitItem->save();

            $solderInformation = TermRelation::retrieveSolderTerms($solderKit->user_id);
            $itemType = ItemType::find( $solderKit->item_type_id );
            $solderInformation->item_name = $itemType->type_name;
            $solderInformation->issue_date = $solderKit->issue_date;
            $solderInformation->expire_date = $solderKit->expire_date;

            return ['success'=>true, 'data'=> $solderInformation ,'message'=>'Item assigned success'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }

    /*
     * Get Kit User by Company
     */
    public function getKitUserByCompany(Request $request){
        try{
            $companySolders = [];
            if($request->input('company_user_id')) {
                $currentUser = User::find($request->input('company_user_id'));
            }else {
                $currentUser = $request->user();
            }
            if(!$currentUser || !$currentUser->hasRole('company'))
                throw new Exception("User should be company role");
            $companyTerms = TermRelation::retrieveCompanySoldersTerms($currentUser->id);

            if (count($companyTerms) > 0) {
		    foreach ($companyTerms as $term) {
                    $solder = User::find($term->user_id);
                    if(!$solder)
                        continue;
                    array_push($companySolders, $solder);
                }
            }
            return ['success'=>true, 'data'=> $companySolders ,'message'=>'Fetch users by company id'];

        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }

    /*
     * Save device ID
     */
    public function saveUserDeviceId(Request $request){
        try{
            if(!$request->input('device_id'))
                throw new Exception("Device Id required");
            $user = $request->user();
            if(!$user)
                throw new Exception("Sorry authentication problem");
            $user->device_id = $request->input('device_id');
            $user->save();
            return ['success'=>true, 'message'=>"Device Id save successful!", 'device_id'=>$user->device_id];
        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }

}
