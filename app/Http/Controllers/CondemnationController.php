<?php

namespace App\Http\Controllers;

use App\Condemnation;
use App\TermRelation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use League\Flysystem\Exception;

class CondemnationController extends Controller
{
    /*
     * Save condemnation with term relation
     */
    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'condemnation_name' => 'required',
                'condemnation_date' => 'required',
                'central_office_id' => 'required',
                'district_office_id' => 'required',
                'unit_id' => 'required',
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

            $termRelation = new TermRelation();
            $termRelation->central_office_id = $request->input('central_office_id');
            $termRelation->district_office_id = $request->input('district_office_id');
            $termRelation->unit_id = $request->input('unit_id');
            $termRelation->term_type = 1; // 0 = solder, 1= condemnation
            $termRelation->save();

            $condemnation = new Condemnation();
            $condemnation->condemnation_name = $request->input('condemnation_name');
            $condemnation->condemnation_date = $request->input('condemnation_date');
            $condemnation->unit_id = $termRelation->unit_id;
            $condemnation->term_id = $termRelation->id;
            $condemnation->save();
            $condemnation->terms = TermRelation::getCondemnationTerms($termRelation->id);

            return ['success'=>true,'data'=>$condemnation, 'message'=>"Condemnation save successful!"];
        }catch (Exception $exception){
            return ['success'=>false, 'message'=>$exception->getMessage()];
        }
    }

    /*
     * Get all active condemnation
     * @status = 1
     */
    public function getCondemnations(){
        try{
            $condemnations = Condemnation::where('status',0)->get();
            if( count($condemnations)>0){
                foreach($condemnations as $key=>$condemnation){
                    $condemnations[$key]->terms = TermRelation::getCondemnationTerms($condemnation->term_id);
                }
            }
            return ['success'=>true, 'data'=>$condemnations];
        }catch (Exception $exception){
            return ['success'=>false, 'message'=>$exception->getMessage()];
        }
    }
    /*
    * Get all active condemnation
    * @status = 1
    * @field(unit_id)
     *
     * Request from company or unit
    */
    public function getCondemnationsByUnitId(Request $request){
        try{
            if(!$request->input('unit_id'))
                throw new Exception("Unit Id is required!");

            $condemnations = Condemnation::where(['status'=>0, 'unit_id'=>$request->input('unit_id')])->get();
            if( count($condemnations)>0){
                foreach($condemnations as $key=>$condemnation){
                    $condemnations[$key]->terms = TermRelation::getCondemnationTerms($condemnation->term_id);
                }
            }
            return ['success'=>true, 'data'=>$condemnations];
        }catch (Exception $exception){
            return ['success'=>false, 'message'=>$exception->getMessage()];
        }
    }
    /*
     * Get condemnation by ID
     * @condemnation_id
     */
    public function getCondemnationById(Request $request){
        try{
            if( !$request->input('condemnation_id') )
                throw new Exception("Condemnation ID required!");

            $condemnation= Condemnation::find($request->input('condemnation_id'));
            if(!$condemnation)
                throw new Exception("Condemnation not found with this ID");

            $condemnation->terms = TermRelation::getCondemnationTerms($condemnation->term_id);

            return ['success'=>true, 'data'=>$condemnation];
        }catch (Exception $exception){
            return ['success'=>false, 'message'=>$exception->getMessage()];
        }
    }

    /*
     * Get condemnation by Unit_id | central_id | district_id
     */
    public function getCondemnationByQuery(Request $request){
        try{
            $where = [];
            if( $request->input('unit_id') )
                $where['unit_id'] = $request->input('unit_id');
            if( $request->input('central_office_id') )
                $where['central_office_id'] = $request->input('central_office_id');
            if( $request->input('unit_id') ) {
                $where['unit_id'] = $request->input('unit_id');
            }
            $where['term_type'] = 1;
            $parsedTerms = Condemnation::getCondemnationByTermQuery($where);
            return ['success'=>true, 'data'=>$parsedTerms];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Delete condemnation
     */
    public function delete(Request $request){
        try{
            if( !$request->input('condemnation_id') )
                throw new Exception("Must be need condemnation Id");
            $condemnation = Condemnation::find($request->input('condemnation_id'));
            // Delete terms
            TermRelation::find($condemnation->term_id)->delete();
            // Delete condemnation
            $condemnation->delete();
            return ['success'=>true, 'message'=>'Condemnation delete successful!'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

}
