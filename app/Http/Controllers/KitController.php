<?php

namespace App\Http\Controllers;

use App\CentralOffice;
use App\Company;
use App\DistrictOffice;
use App\QuarterMaster;
use App\TermRelation;
use App\Unit;
use Illuminate\Http\Request;
use League\Flysystem\Exception;

class KitController extends Controller
{
    public function getKitControllers(Request $request){
        try{
            $currentUser = $request->user();
            if(!$currentUser || !$currentUser->hasRole('central'))
                throw new Exception("You have to logged in as central level!");
            $kitController = new \stdClass();
            $kitController->companies = Company::getOfficesWithAdmin();
            $kitController->central_offices = CentralOffice::getOfficeWithAdmin();
            $kitController->formation_offices =  DistrictOffice::getOfficesWithAdmin();
            $kitController->units = Unit::getOfficesWithAdmin();
            $kitController->quarters = QuarterMaster::getOfficeWithAdmin();

            return ['success'=>true ,'message'=>"Get all kit controllers ", 'data'=> $kitController ];

        }catch (Exception $e){
            return ['success'=>true, 'message'=>$e->getMessage()];
        }
    }
}
