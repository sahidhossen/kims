<?php

namespace App\Http\Controllers;

use App\CentralOffice;
use App\TermRelation;
use Illuminate\Http\Request;
use League\Flysystem\Exception;

class CentralController extends Controller
{

    /*
     * Get all central offices
     */
    public function getAllCentralOffice(){
        try{
            $centralOffices = CentralOffice::all();
            return ['success'=>true, 'data'=>$centralOffices,'message'=>"All central offices"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Get central office by central office id
     */
    public function getCentralOfficeById( Request $request ){
        try{
            if( !$request->input('central_id'))
                throw  new Exception("Central Id required for retrive central office");

            $centralOffice = CentralOffice::find($request->input('central_id'));
            if( !$centralOffice )
                throw new Exception("Central office not found with this ID");

            return ['success'=>true ,'data'=>$centralOffice, 'message'=>"Found central office"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Save central office or head of district
     */
    public function store(Request $request){
        try{
            if(!$request->input('central_name') )
                throw new Exception("Central name is required!");
            $centralOffice = new CentralOffice();
            $centralOffice->central_name = $request->input('central_name');
            $centralOffice->central_details = $request->input('central_details');
            if(!$centralOffice->save())
                throw new Exception("Critical error when save central office data!");
            $where = ['central_office_id'=>$centralOffice->id,'role'=>1];
            $centralOffice->head = TermRelation::findMyAdmin($where);
            return ['success'=>true, 'message'=>'Cetnral office save success', 'data'=>$centralOffice];

        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }


    /*
     * update central office or head off central
     */
    public function update( Request $request){
        try{
            if( !$request->input('central_id'))
                throw new Exception("Central Id required for update");

            $centralOffice = CentralOffice::find( $request->input('central_id'));
            if( !$centralOffice )
                throw new Exception("Central office not found with this id");

            $centralName = $request->input('central_name');
            if( $centralName == '' )
                throw new Exception("Minimum central name length need 2");

            $centralOffice->central_name = $centralName;
            $centralOffice->central_details = $request->input('central_details') ? $request->input('central_details') : $centralOffice->cental_details;
            $centralOffice->save();

            return ['success'=>true, 'message'=>"Central office save!", 'data'=>$centralOffice ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Delete central office
     */
    public function delete( Request $request ){
        try{
            if( !$request->input('central_id'))
                throw new Exception("Central Id required for delete central office");

            $centralOffice = CentralOffice::find( $request->input('central_id'));
            if( !$centralOffice )
                throw new Exception("Central office not found with this id");

            $centralOffice->delete();
            return ['success'=>true, 'message'=>"Central office delete successful!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
}
