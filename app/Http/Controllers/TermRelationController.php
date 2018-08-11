<?php

namespace App\Http\Controllers;

use App\TermRelation;
use Illuminate\Http\Request;
use League\Flysystem\Exception;

class TermRelationController extends Controller
{
    public function createRelation($data){
        try{
            $newRelation = new TermRelation();
            if( isset($data['user_id']) && $data['user_id']){
                $newRelation->user_id = $data['user_id'];
            }
            if( isset($data['central_office_id']) && $data['central_office_id']){
                $newRelation->central_office_id = $data['central_office_id'];
            }
            if( isset($data['district_office_id']) && $data['district_office_id']){
                $newRelation->district_office_id = $data['district_office_id'];
            }
            if( isset($data['unit_id']) && $data['unit_id']){
                $newRelation->unit_id = $data['unit_id'];
            }
            if( isset($data['company_id']) && $data['company_id']){
                $newRelation->company_id = $data['company_id'];
            }
            if( isset($data['status']) && $data['status']){
                $newRelation->status = $data['status'];
            }
            $newRelation->save();
        }catch(Exception $e){
            return $e;
        }
    }
}
