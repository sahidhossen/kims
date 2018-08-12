<?php

namespace App\Http\Controllers;

use App\DistrictOffice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use League\Flysystem\Exception;

class DistrictController extends Controller
{

    /*
     * Get all district offices
     */
    public function getAllDistrictOffice(){
        try{
            $districtOffices = DistrictOffice::all();
            return ['success'=>true, 'data'=>$districtOffices,'message'=>"All district offices"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Get district office by district office id
     */
    public function getDistrictOfficeById( Request $request ){
        try{
            if( !$request->input('district_id'))
                throw  new Exception("District Id required for retrive district office");

            $districtOffice = DistrictOffice::find($request->input('district_id'));
            if( !$districtOffice )
                throw new Exception("district office not found with this ID");

            return ['success'=>true ,'data'=>$districtOffice, 'message'=>"Found district office"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Save district office or head of district
     */
    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'district_name' => 'required',
                'central_office_id' => 'required',
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

            $districtOffice = new DistrictOffice();
            $districtOffice->district_name = $request->input('district_name');
            $districtOffice->central_office_id = $request->input('central_office_id');
            $districtOffice->district_details = $request->input('district_details');
            if(!$districtOffice->save())
                throw new Exception("Critical error when save district office data!");

            return ['success'=>true, 'message'=>'Cetnral office save success', 'data'=>$districtOffice];

        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }


    /*
     * update district office or head off district
     */
    public function update( Request $request){
        try{
            if( !$request->input('district_id'))
                throw new Exception("district Id required for update");

            $districtOffice = DistrictOffice::find( $request->input('district_id'));
            if( !$districtOffice )
                throw new Exception("district office not found with this id");

            $districtName = $request->input('district_name');
            if( $districtName == '' )
                throw new Exception("Minimum district name length need 2");

            $districtOffice->district_name = $districtName;
            $districtOffice->district_details = $request->input('district_details') ? $request->input('district_details') : $districtOffice->district_details;
            $districtOffice->save();

            return ['success'=>true, 'message'=>"district office save!", 'data'=>$districtOffice ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Delete district office
     */
    public function delete( Request $request ){
        try{
            if( !$request->input('district_id'))
                throw new Exception("district Id required for delete district office");

            $districtOffice = DistrictOffice::find( $request->input('district_id'));
            if( !$districtOffice )
                throw new Exception("district office not found with this id");

            $districtOffice->delete();
            return ['success'=>true, 'message'=>"district office delete successful!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
}
