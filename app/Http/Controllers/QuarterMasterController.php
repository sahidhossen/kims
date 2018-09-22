<?php

namespace App\Http\Controllers;

use App\QuarterMaster;
use App\TermRelation;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use League\Flysystem\Exception;

class QuarterMasterController extends Controller
{

    /*
     * Get all district offices
     */
    public function getAllQuarterMaster(){
        try{
            $quarterMasters = QuarterMaster::all();
            return ['success'=>true, 'data'=>$quarterMasters,'message'=>"All quarter master offices"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Get quarter master office by district office id
     */
    public function getQuarterMasterById( Request $request ){
        try{
            if( !$request->input('quarter_master_id'))
                throw  new Exception("Quarter Master Id required for retrieve quarter office");

            $quarterMaster = QuarterMaster::find($request->input('quarter_master_id'));
            if( !$quarterMaster )
                throw new Exception("quarter master office not found with this ID");

            $where = ['quarter_master_id'=>$quarterMaster->id,'role'=>6];
            $quarterMaster->head = TermRelation::findMyAdmin($where);

            return ['success'=>true ,'data'=>$quarterMaster, 'message'=>"Found quarter office"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Save quarter office or head of district
     */
    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'quarter_name' => 'required',
                'central_office_id' => 'required',
                'formation_office_id' => 'required',
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

            $quarterMaster = new QuarterMaster();
            $quarterMaster->quarter_name = $request->input('quarter_name');
            $quarterMaster->central_office_id = $request->input('central_office_id');
            $quarterMaster->formation_office_id = $request->input('formation_office_id');
            $quarterMaster->quarter_details = $request->input('quarter_details');
            if(!$quarterMaster->save())
                throw new Exception("Critical error when save quarter office data!");

            $where = ['quarter_master_id'=>$quarterMaster->id,'role'=>6];
            $quarterMaster->head = TermRelation::findMyAdmin($where);

            return ['success'=>true, 'message'=>'Quarter master office save success', 'data'=>$quarterMaster];

        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }


    /*
     * update district office or head off district
     */
    public function update( Request $request){
        try{
            if( !$request->input('quarter_master_id'))
                throw new Exception("quarter Id required for update");

            $quarterMaster = QuarterMaster::find( $request->input('district_id'));
            if( !$quarterMaster )
                throw new Exception("district office not found with this id");

            $districtName = $request->input('district_name');
            if( $districtName == '' )
                throw new Exception("Minimum district name length need 2");

            $quarterMaster->district_name = $districtName;
            $quarterMaster->district_details = $request->input('district_details') ? $request->input('district_details') : $quarterMaster->district_details;
            $quarterMaster->save();

            return ['success'=>true, 'message'=>"district office save!", 'data'=>$quarterMaster ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Delete district office
     */
    public function delete( Request $request ){
        try{
            if( !$request->input('id'))
                throw new Exception("Id required for delete district office");

            $quarterMaster = QuarterMaster::find( $request->input('id'));
            if( !$quarterMaster )
                throw new Exception("quarter master office not found with this id");

            $quarterMaster->delete();
            return ['success'=>true, 'message'=>"quarter master office delete successful!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
   * Get all units by quarter master user id
   */
    public function getUnitsByQuarterMasterUserId(Request $request){
        try{
            if(!$request->input('quarter_master_id'))
                throw new Exception("Quarter master user id required!");
            $unitUser = User::find($request->input('quarter_master_id'));
            if(!$unitUser)
                throw new Exception("Sorry quarter master user not found!");
            if(!$unitUser->hasRole('quarter_master'))
                throw new Exception("You provide wrong id");
            $unitTerms = TermRelation::retrieveQuarterMasterUnitsTerms( $unitUser->id );
            $unitCompanies = [];
            if( count( $unitTerms) > 0 ){
                foreach( $unitTerms as $term ){
                    $user = User::find( $term->user_id );
                    if(!$user){
                        continue;
                    }
                    if($user->hasRole('unit')) {
                        $user->unit_id = $term->unit_id;
                        $company = TermRelation::getUnitInfoByUserId($user->id);
                        $user->unit_name = $company == null ? null : $company->unit_name;
                        array_push($unitCompanies, $user);
                    }
                }
            }
            return ['success'=>true, 'data'=>$unitCompanies];

        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
}
