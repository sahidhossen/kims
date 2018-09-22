<?php

namespace App\Http\Controllers;

use App\Company;
use App\TermRelation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use League\Flysystem\Exception;

class CompanyController extends Controller
{
    /*
    * Get all company offices
    */
    public function getAllCompany(){
        try{
            $companies = Company::all();
            return ['success'=>true, 'data'=>$companies,'message'=>"All company offices"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Get company office by company office id
     */
    public function getCompanyById( Request $request ){
        try{
            if( !$request->input('company_id'))
                throw  new Exception("Company Id required for retrive company");

            $company = Company::find($request->input('company_id'));
            if( !$company )
                throw new Exception("Company not found with this ID");

            return ['success'=>true ,'data'=>$company, 'message'=>"Found company office"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Save company office or head of district
     */
    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'company_name' => 'required',
                'central_office_id' => 'required',
                'formation_office_id' => 'required',
                'unit_id' => 'required'
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
            $Company = new Company();
            $Company->company_name = $request->input('company_name');
            $Company->central_office_id = $request->input('central_office_id');
            $Company->district_office_id = $request->input('formation_office_id');
            $Company->unit_id = $request->input('unit_id');
            $Company->company_details = $request->input('company_details');
            if(!$Company->save())
                throw new Exception("Critical error when save company data!");
            $where = ['company_id'=>$Company->id,'role'=>4];
            $Company->head = TermRelation::findMyAdmin($where);
            return ['success'=>true, 'message'=>'Company save success', 'data'=>$Company];

        }catch (Exception $e){
            return ['success'=>false, 'message'=> $e->getMessage()];
        }
    }


    /*
     * update company office or head off company
     */
    public function update( Request $request){
        try{
            if( !$request->input('company_id'))
                throw new Exception("Company Id required for update");

            $company = Company::find( $request->input('company_id'));
            if( !$company )
                throw new Exception("company office not found with this id");

            $companyName = $request->input('company_name');
            if( $companyName == '' )
                throw new Exception("Minimum company name length need 2");

            $company->company_name = $companyName;
            $company->company_details = $request->input('company_details') ? $request->input('company_details') : $company->company_details;
            $company->save();

            return ['success'=>true, 'message'=>"company office save!", 'data'=>$company ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Delete company office
     */
    public function delete( Request $request ){
        try{
            if( !$request->input('id'))
                throw new Exception("Company Id required for delete company");

            $Company = Company::find( $request->input('id'));

            if( !$Company )
                throw new Exception("Company not found with this id");
            $termRelation = TermRelation::where(['role'=>4, 'term_type'=>0, 'company_id'=>$Company->id])->first();
            if($termRelation )
                throw new Exception("This company has administrator. You have to delete first his administrator");
            $Company->delete();
            return ['success'=>true, 'message'=>"Company delete successful!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
}
