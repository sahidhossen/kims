<?php

namespace App\Http\Controllers;

use App\CentralOffice;
use App\Company;
use App\DistrictOffice;
use App\QuarterMaster;
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
            $kitController->companies = Company::all();
            $kitController->central_offices = CentralOffice::all();
            $kitController->formation_offices =  DistrictOffice::all();
            $kitController->units = Unit::all();
            $kitController->quarters = QuarterMaster::all();
            $kitController->demo = 'asdfasdf';
            return ['success'=>true ,'message'=>"Get all kit controllers ", 'data'=> $kitController ];

        }catch (Exception $e){
            return ['success'=>true, 'message'=>$e->getMessage()];
        }
    }
}
