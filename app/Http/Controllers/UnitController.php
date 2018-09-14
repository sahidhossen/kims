<?php

namespace App\Http\Controllers;

use App\TermRelation;
use App\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use League\Flysystem\Exception;

class UnitController extends Controller
{
    /*
   * Get all unit offices
   */
    public function getAllUnit(){
        try{
            $companies = Unit::all();
            return ['success'=>true, 'data'=>$companies,'message'=>"All units"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Get unit office by unit office id
     */
    public function getUnitById( Request $request ){
        try{
            if( !$request->input('unit_id'))
                throw  new Exception("Unit Id required for retrive unit");

            $unit = Unit::find($request->input('unit_id'));
            if( !$unit )
                throw new Exception("Unit not found with this ID");

            return ['success'=>true ,'data'=>$unit, 'message'=>"Found unit"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Save unit office
     */
    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'unit_name' => 'required',
                'central_office_id' => 'required',
                'formation_office_id' => 'required'
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

            $Unit = new Unit();
            $Unit->unit_name = $request->input('unit_name');
            $Unit->central_office_id = $request->input('central_office_id');
            $Unit->district_office_id = $request->input('formation_office_id');
            $Unit->unit_details = $request->input('unit_details');
            if(!$Unit->save())
                throw new Exception("Critical error when save unit data!");
            $where = ['unit_id'=>$Unit->id,'role'=>3];
            $Unit->head = TermRelation::findMyAdmin($where);
            return ['success'=>true, 'message'=>'Unit save success', 'data'=>$Unit];

        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }


    /*
     * update unit office or head off unit
     */
    public function update( Request $request){
        try{
            if( !$request->input('unit_id'))
                throw new Exception("Unit Id required for update");

            $unit = Unit::find( $request->input('unit_id'));
            if( !$unit )
                throw new Exception("unit office not found with this id");

            $unitName = $request->input('unit_name');
            if( $unitName == '' )
                throw new Exception("Minimum unit name length need 2");

            $unit->unit_name = $unitName;
            $unit->unit_details = $request->input('unit_details') ? $request->input('unit_details') : $unit->cental_details;
            $unit->save();

            return ['success'=>true, 'message'=>"unit office save!", 'data'=>$unit ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Delete unit office
     */
    public function delete( Request $request ){
        try{
            if( !$request->input('unit_id'))
                throw new Exception("Unit Id required for delete unit");

            $Unit = Unit::find($request->input('unit_id'));
            if( !$Unit )
                throw new Exception("Unit not found with this id");

            $Unit->delete();
            return ['success'=>true, 'message'=>"Unit delete successful!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
}
