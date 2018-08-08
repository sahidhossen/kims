<?php

namespace App\Http\Controllers;

use App\Unit;
use Illuminate\Http\Request;
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
            if(!$request->input('unit_name') )
                throw new Exception("unit name is required!");
            $Unit = new Unit();
            $Unit->unit_name = $request->input('unit_name');
            if( $Unit->unit_name == '' )
                throw new Exception("Minimum unit name length need 2");
            $Unit->unit_details = $request->input('unit_details');
            if(!$Unit->save())
                throw new Exception("Critical error when save unit data!");

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
