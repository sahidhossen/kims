<?php

namespace App\Http\Controllers;

use App\CentralOffice;
use App\ItemType;
use App\KitItem;
use App\SolderKits;
use App\TermRelation;
use App\User;
use Illuminate\Http\Request;
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
     */
    public function getKitSolder( Request $request ){
        try{
            $currentUser = $request->user();
            if( $currentUser->roles == null )
                throw new Exception("User don't have any role");

            $currentUser->whoami = $currentUser->roles->first()->name;
            $solderKit = SolderKits::where( 'user_id',$currentUser->id )
                ->where('status','!=',3)->get();
            $items = [];
            if( count($solderKit) > 0 ) {
                foreach( $solderKit as $kit ) {
                    $solderInformation = TermRelation::retrieveSolderTerms($kit->user_id);
                    $itemType = ItemType::find($kit->item_type_id);
                    $solderInformation->item_name = $itemType->type_name;
                    $solderInformation->status = $kit->status;
                    $solderInformation->issue_date = $kit->issue_date;
                    $solderInformation->expire_date = $kit->expire_date;
                    $solderInformation->id = $kit->id;
                    $solderInformation->name = $currentUser->name;
                    $solderInformation->professional = $currentUser->professional;
                    $solderInformation->designation = $currentUser->designation;
                    $solderInformation->mobile = $currentUser->mobile;
                    $solderInformation->secret_id = $currentUser->secret_id;
                    array_push($items, $solderInformation);
                }
            }
            $companySolders = [];
            if($currentUser->hasRole('company')){
                $companyTerms = TermRelation::retrieveCompanyTerms( $currentUser->id );
                if( count( $companyTerms) >0 ){
                    foreach( $companyTerms as $term ){
                        $solder = User::find( $term->user_id );
                        array_push($companySolders, $solder);
                    }
                }
            }

            return [
                'success' => true,
                'solders'=>$companySolders,
                'items' => $items,
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
            $result = [];
            if( count($solderKit) > 0 ) {
                foreach( $solderKit as $kit ) {
                    $solderInformation = TermRelation::retrieveSolderTerms($kit->user_id);
                    $itemType = ItemType::find($kit->item_type_id);
                    $solderInformation->item_name = $itemType->type_name;
                    $solderInformation->status = $kit->status;
                    $solderInformation->issue_date = $kit->issue_date;
                    $solderInformation->expire_date = $kit->expire_date;
                    $solderInformation->whoami = $currentUser->roles->first()->name;
                    $solderInformation->name = $currentUser->name;
                    $solderInformation->professional = $currentUser->professional;
                    $solderInformation->designation = $currentUser->designation;
                    $solderInformation->mobile = $currentUser->mobile;
                    $solderInformation->secret_id = $currentUser->secret_id;
                    array_push($result, $solderInformation);
                }
            }
            return [ 'success' => true, 'data' => $result, 'message'=>'Current user information.'];
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

    public function userById(Request $request){
        try{
            $user = User::find( $request->input('user_id') );
            if(!$user)
                throw new Exception("User not found!");

            if( count($user->roles) === 0 )
                throw new Exception("User don't have any role!");

            $user->whoami = $user->roles->first()->name;
                if( $user->whoami == null )
                    throw new Exception("User don't have any role");

            $termRelation = TermRelation::where( 'user_id',$user->id )->first();
            if(!$termRelation)
                throw new Exception("User haven't any relation with central office ");

            $centralOffice = CentralOffice::find( $termRelation->central_office_id );
            if( !$centralOffice )
                throw new Exception("Cannot find any central office with this ID ");
            $user->central_office_name = $centralOffice->central_name;
            $user->central_office_id = $centralOffice->id;

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

            if( !in_array( $request->input('role'), config('kims.solder_roles')))
                throw new Exception("Provided user role invalid. Role should be between ".implode(', ', config('kims.solder_roles')));

            $validator = Validator::make($request->all(), [
                'secret_id' => 'required|unique:users',
                'password' => 'required',
                'name' => 'required|min:5',
                'professional' => 'required|min:2',
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
                TermRelation::createRelation( $relationTableData );
            }
            return [ 'success' => true, 'data' => $user, 'message'=>'Add user successfully!'];
        }catch(Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }


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
                'item_type_id' => 'required'
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
            $solderKit->issue_date = date('y-m-d h:m:s');
            $effectiveDate = date('Y-m-d h:m:s', strtotime('+3 month'));
            $solderKit->expire_date = $effectiveDate;

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

}
