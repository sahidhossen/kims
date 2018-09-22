<?php

namespace App\Http\Controllers;

use App\Condemnation;
use App\ItemType;
use App\KimNotification;
use App\KitItem;
use App\KitItemRequest;
use App\SolderItemRequest;
use App\SolderKits;
use App\TermRelation;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use League\Flysystem\Exception;
use phpDocumentor\Reflection\Types\Object_;

class ItemRequestController extends Controller
{
    /*
     * Only get the status = 2 type request for units/BQMS approval
     * Find out all request that company made for his solders
     * Count items by their item types and make a json string to send to units
     * json string will hold (total_item(), total type with items number
     *
     * This json string will send to the kit_item_request table for other operations
     */

    /*
     * Create solder request for new product
     * request_type = company | solder
     *
     * @fields(solder_kit_id, request_type, comments, kit_problem)
     */
   public function SolderRequest(Request $request){
       try{
           $validator = Validator::make($request->all(), [
               'solder_kit_id' => 'required',
               'request_type'=>'required'
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
           // Get current item which assign to solder
           $actionItem = SolderKits::find( $request->input('solder_kit_id') );
           // Get solder related terms
           $terms = TermRelation::where(['user_id'=>$actionItem->user_id, 'term_type'=>0])->first();

           $newRequest = new SolderItemRequest();
           $newRequest->user_id = $terms->user_id;
           $newRequest->company_id = $terms->company_id;
           $newRequest->solder_kit_id = $request->input('solder_kit_id');
           $newRequest->problem_list = $request->input('kit_problem');
           $newRequest->comments = $request->input('comments');
           if( $request->input('request_type') === 'company' )
               $newRequest->status = 1; // Request for new item and approve from company
           $newRequest->save();

           // Change solder kit status 1 for pending mode
           $actionItem->status = 1;
           $actionItem->save();

           // Send solder notification after accept new kit item request
           $notificationSend = KimNotification::sendDownstreamMessage();
           return ['success'=>true, 'message'=>"Request send to the company. Will review as soon as possible!"];
       }catch (Exception $e){
           return ['success'=>false, 'message'=>$e->getMessage()];
       }
   }

   public function solderPendingRequest(Request $request){
       try{
           $solder = $request->user();
           if(!$solder || !$solder->hasRole('solder'))
               throw new Exception("This request only for solder");
           $allPendingRequest = SolderItemRequest::where([
               'user_id'=>$solder->id,
               'status' => 0
           ])->get();
           //->whereIn('status', [0])
           $items = [];
           $result = [];
           if(count($allPendingRequest) > 0 ){
               foreach( $allPendingRequest as $p_item ){
                   $item = SolderKits::find( $p_item->solder_kit_id );
                   $itemType = ItemType::find($item->item_type_id);

                   $item_property = new \stdClass();

                   $item_property->id = $p_item->id;
                   $item_property->type_name = $itemType->type_name;
                   $item_property->kit_problem = $p_item->problem_list;
                   $item_property->user_name = User::getParams($p_item->user_id, 'name');
                   $item_property->user_device_id = User::getParams($p_item->user_id, 'device_id');
                   $item_property->status = $p_item->status;
                   $item_property->issue_date = $item->issue_date;
                   $item_property->expire_date = $item->expire_date;
                   $type_name = strtolower(str_replace(' ','_',$itemType->type_name));
                   if(isset($items[$type_name])){
                       array_push($items[$type_name], $item_property );
                   }else {
                       $items[$type_name] = array($item_property);
                   }
               }
               if(count($items) > 0 ){
                   foreach( $items as $type_name=>$item){
                       $newItem = [];
                       $newItem['item_name'] = $type_name;
                       $newItem['items'] = $item;
                       array_push($result, $newItem);
                   }
               }

           }

           return ['success'=>true, 'data'=>$result];
       }catch (Exception $e){
           return ['success'=>false, 'message'=>$e->getMessage()];
       }
   }

   /*
    * Soldier can cancel their request
    * If soldier cancel the request then delete the requested id
    */

   public function soldierCancelRequest(Request $request){
       try{
           $soldier = $request->user();
           if(!$soldier || !$soldier->hasRole('solder'))
               throw new Exception("You need to logged in as soldier");
           if( !$request->input('solider_request_id'))
               throw new Exception("Must be need request ID");
           $currentRequest = SolderItemRequest::find( $request->input('soldier_request_id'));
           if( !$currentRequest )
               throw new Exception("Sorry didn't find your request data");
           $actionItem = SolderKits::find( $currentRequest->solder_kit_id );
           $actionItem->status = 1; // cancel and re-usable
           $actionItem->save();
           $currentRequest->delete();
           return ['success'=>true ,'message'=>'Item request cancel!', 'data'=>$actionItem];
       }catch (Exception $e){
           return ['success'=>false, 'message'=>$e->getMessage()];
       }
   }


   public function SolderToCompanyRequest(Request $request){
       try{
           $soldier = $request->user();
           if(!$soldier || !$soldier->hasRole('solder'))
               throw new Exception("You need to logged in as soldier");
           if( !$request->input('soldier_request_ids'))
               throw new Exception("Must be need request ID's");
            $ids = explode(',', $request->input('soldier_request_ids'));
            $pendingRequest = SolderItemRequest::findMany($ids);
           if(count($pendingRequest)>0){
               foreach($pendingRequest as $pRequest){
                   $pRequest->status = 1;
                   $pRequest->save();
               }
           }else{
               throw new Exception("Did't find any request!");
           }
           return ['success'=>true ,'message'=>'Request send to company!'];

       }catch (Exception $e){
           return ['success'=>false, 'message'=>$e->getMessage()];
       }
   }

    /*
    * Approve solder to company request by company user
    */
    public function companyApproveRequest(Request $request){
        try{
            $companyUser = $request->user();
            if(!$companyUser || !$companyUser->hasRole('company'))
                throw new Exception("You need to logged in as company");

            if( !$request->input('solder_request_id'))
                throw new Exception("Must be need request ID");
            $currentRequest = SolderItemRequest::find( $request->input('solder_request_id'));
            if( !$currentRequest )
                throw new Exception("Sorry didn't find your request data");
            $currentRequest->status = 2;
            $currentRequest->save();
            $currentRequest->soldier_device_id= User::find($currentRequest->user_id)->device_id;
            $actionItem = SolderKits::find( $currentRequest->solder_kit_id );
            $actionItem->status = 2; // cancel and re-usable
            $actionItem->save();

            return ['success'=>true ,'message'=>'Approve successful!','data'=>$currentRequest];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

   /*
    * Cancel Request by company user
    * @solder_request_id
    */
   public function cancelRequest( Request $request ){
       try{
           $companyUser = $request->user();
           if(!$companyUser || !$companyUser->hasRole('company'))
               throw new Exception("You need to logged in as company");
           if( !$request->input('solder_request_id'))
               throw new Exception("Must be need request ID");
           $currentRequest = SolderItemRequest::find( $request->input('solder_request_id'));
           if( !$currentRequest )
               throw new Exception("Sorry didn't find your request data");
           $currentRequest->status = 3;
           $currentRequest->save();
           $actionItem = SolderKits::find( $currentRequest->solder_kit_id );
           $actionItem->status = 3; // cancel and re-usable
           $actionItem->save();
           $actionItem->soldier_device_id = User::find($actionItem->user_id)->device_id;

           return ['success'=>true ,'message'=>'Item request cancel!', 'data'=>$actionItem];
       }catch (Exception $e){
           return ['success'=>false, 'message'=>$e->getMessage()];
       }
   }

    /*
    * All Pending Request
    * To see the pending request list
     * @role = company
     * status =1 (company approved)
     * status = 0 (company
    */
    public function companyPendingRequest(Request $request){
        try{
            if(!$request->input('company_id'))
                throw new Exception("Company Id required!");

            $allPendingRequest = SolderItemRequest::where([
                'company_id'=>$request->input('company_id')
            ])->whereIn('status', [1,2])->get();
            $result = [];
            if(count($allPendingRequest) > 0 ){
                foreach( $allPendingRequest as $p_item ){
                    $item = SolderKits::find( $p_item->solder_kit_id );
                    $itemType = ItemType::find($item->item_type_id);

                    $item_property = new \stdClass();

                    $item_property->id = $p_item->id;
                    $item_property->type_name = $itemType->type_name;
                    $item_property->kit_problem = $p_item->problem_list;
                    $item_property->user_name = User::getParams($p_item->user_id, 'name');
                    $item_property->user_device_id = User::getParams($p_item->user_id, 'device_id');
                    $item_property->status = $p_item->status;
                    $item_property->issue_date = $item->issue_date;
                    $item_property->expire_date = $item->expire_date;
                    $type_name = strtolower(str_replace(' ','_',$itemType->type_name));
                    if(isset($result[$type_name])){
                        array_push($result[$type_name], $item_property );
                    }else {
                        $result[$type_name] = array($item_property);
                    }
                }
            }
            return ['success'=>true, 'data'=>$result];

        }catch (Exception $e){
            return ['success'=>true, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Send request to the unit/district level
     * Collect all request with their item types
     * Make a json stringify object
     * Create a new entry to the kit_item_request
     *
     * @fields(company_id, user_id, condemnation_id)
     */
    public function requestCompanyToUnit(Request $request){
        try{
            // Collect all request based on company id
            $companyUser = $request->user();
            if(!$companyUser || !$companyUser->hasRole('company'))
                throw new Exception("Must be send by company");

            $validator = Validator::make($request->all(), [
                'condemnation_id'=>'required'
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

            $activeCondemnation = Condemnation::where(['id'=>$request->input('condemnation_id'),'status'=>0]);
            if(!$activeCondemnation)
                throw new Exception("Sorry condemnation not found!");

            $company_term = TermRelation::where(['user_id'=>$companyUser->id,'role'=>4, 'term_type'=>0])->first();

            // Get all solder request that approve by company
            $allPendingRequest = SolderItemRequest::where([
                'company_id'=>$company_term->company_id,
                'status'=>2
            ])->get();

            if(count($allPendingRequest) === 0 )
                throw new Exception("Pending request not found!");

            // Get company term

            $requestJsonData = array();
            $requestItems = 0;
            $collectedKitTypes = [];
            $mainCollection =[];
            foreach( $allPendingRequest as $key=>$pendingRequest ){
                // Get request item
                $kitItem = SolderKits::find($pendingRequest->solder_kit_id);

                // Collect item Ids
                if(isset($requestJsonData['kit_ids'])){
                    $requestJsonData['kit_ids'] = $requestJsonData['kit_ids'].','.$kitItem->item_id;
                }else {
                    $requestJsonData['kit_ids'] = (string)$kitItem->item_id;
                }
                // Get kit types
                $item_types = ItemType::find($kitItem->item_type_id);

                if(isset($collectedKitTypes[$item_types->type_name])){
                    $collectedKitTypes[$item_types->type_name] +=1;
                }else {
                    $collectedKitTypes[$item_types->type_name] = 1;
                }

                $requestItems += 1;
                $pendingRequest->status = 2;
                $pendingRequest->save();
            }
            if(count($collectedKitTypes)>0){
                foreach($collectedKitTypes as $type_name=>$quantity ){
                    array_push($mainCollection, ['type_name'=>$type_name,'quantity'=>$quantity]);
                }
            }


            $companyUnitUser = TermRelation::getCompanyUnitUser($company_term->unit_id);
            if( count($requestJsonData) > 0 ) {
                $requestJsonData = (object) $requestJsonData;
                $requestJsonData->kit_types = $mainCollection;
                // Check if it has already a request
                $unitRequest = KitItemRequest::where([
                    'condemnation_id'=>$request->input('condemnation_id'),
                    'company_user_id'=>$companyUser->id,
                    'stage'=>1,
                    'status'=> 1 // unit level
                ])->first();

                if(!$unitRequest )
                    $unitRequest = new KitItemRequest();
                $unitRequest->stage = 1;
                $unitRequest->status = 1; // For unit
                $unitRequest->request_items = $requestItems;
                $unitRequest->kit_items = \GuzzleHttp\json_encode($requestJsonData);
                $unitRequest->unit_user_id = $companyUnitUser->user_id;
                $unitRequest->company_user_id = $companyUser->id;
                $unitRequest->condemnation_id = $request->input('condemnation_id');
                $unitRequest->save();

                //Send push notification to unit level

            }else {
                throw new Exception("Sorry request item not found!");
            }

            return ['success'=>true, 'message'=>"Request send to unit level!", 'data'=>$company_term ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }



    /*
     * Approve company request by Unit
     *
     */
    public function approveCompanyRequestByUnit(Request $request){
        try{
            $unit = $request->user();
            if(!$unit || !$unit->hasRole('unit'))
                throw new Exception("You need to logged in as unit level!");
            if(!$request->input('request_id'))
                throw new Exception("Must be need request Id");
            $PendingRequest = KitItemRequest::where([
                    'id'=>$request->input('request_id'),
                    'unit_user_id'=>$unit->id,
                    'stage'=>1,
                    'status'=>1
                ])->first();
            if(!$PendingRequest)
                throw new Exception("This request not found");
            $PendingRequest->stage = 2; // Approve
            $PendingRequest->save();
            // Send notofication to the company
            return ['success'=>true, 'message'=> "Request approve success!"];

        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Approve company request by Unit
     *
     */
    public function cancelCompanyRequestByUnit(Request $request){
        try{
            $unit = $request->user();
            if(!$unit || !$unit->hasRole('unit'))
                throw new Exception("You need to logged in as unit level!");
            if(!$request->input('request_id'))
                throw new Exception("Must be need request Id");
            $PendingRequest = KitItemRequest::where([
                'id'=>$request->input('request_id'),
                'unit_user_id'=>$unit->id,
                'stage'=>1,
                'status'=>1
            ])->first();
            if(!$PendingRequest)
                throw new Exception("This request not found");
            $PendingRequest->stage = 3; // Cancel
            $PendingRequest->save();
            // Send notification to the company
            return ['success'=>true, 'message'=> "Request canceled!"];

        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Send request unit to district/formation level
     * Check unit level request by user_id and stage=(1-5)
     * status = 1
     */

    public function requestUnitToQuarterMaster(Request $request){
        try{
            if(!$request->input('condemnation_id'))
                throw new Exception("Condemnation Id is required");
            $unitUser = $request->user(); // Get from auth
            if(!$unitUser || !$unitUser->hasRole('unit'))
                throw new Exception("You need to logged in as unit level!");
            $terms = TermRelation::where(['user_id'=>$unitUser->id])->first();
            $unitBoss = TermRelation::retrieveUnitQuarterMaster($terms->quarter_master_id);
            $pendingRequest = KitItemRequest::where([
                    'condemnation_id'=> $request->input('condemnation_id'),
                    'unit_user_id'=>$unitUser->id,
                    'stage'=>2,
                    'status'=>1
                    ])->get();

            if(count($pendingRequest) == 0)
                throw new Exception("Unit have not any accepted request");

            $districtLevelRequest = [];
            $parentIds = '';
            $condemnation_id = 0;
            $requestItems = 0;
            foreach($pendingRequest as $key=>$pRequest){
                $districtLevelRequest[$key]['company_user_id'] = $pRequest->company_user_id;
                $districtLevelRequest[$key]['kit_items'] = \GuzzleHttp\json_decode($pRequest->kit_items);
                $parentIds = $parentIds == '' ? $pRequest->id : $parentIds.','.$pRequest->id;
                $pRequest->stage = 4;
                $condemnation_id = $pRequest->condemnation_id;
                $requestItems +=$pRequest->request_items;
                $pRequest->save();
            }
            $newRequest = new KitItemRequest();
            $newRequest->condemnation_id = $condemnation_id;
            $newRequest->unit_user_id = $unitUser->id;
            $newRequest->quarter_master_user_id = $unitBoss->user_id;
            $newRequest->stage = 1;
            $newRequest->status = 2;
            $newRequest->parent_ids = $parentIds;
            $newRequest->request_items = $requestItems;
            $newRequest->kit_items = \GuzzleHttp\json_encode($districtLevelRequest);
            $newRequest->save();
            $newRequest->qa_device_id = $unitBoss->device_id;
            return ['success'=> true, 'message'=>"Request send to formation level!", 'data'=>$pendingRequest];

        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * Get all pending request by condemnation id
     */
    public function unitLevelPendingRequest(Request $request){
        try{
            if(!$request->input('condemnation_id'))
                throw new Exception("Condemnation Id required");
            $unitUser = $request->user();
            if(!$unitUser || !$unitUser->hasRole('unit'))
                throw new Exception("Please try to login as unit user!");
            $pendingRequest = KitItemRequest::where([
                'unit_user_id'=>$unitUser->id,
                'condemnation_id'=>$request->input('condemnation_id'),
                'status'=>1
            ])->whereIn('stage', array(1,2,4,5))->get();

            if(count($pendingRequest) > 0 ){
                foreach($pendingRequest as $pRequest){
                    $pRequest->kit_items = \GuzzleHttp\json_decode($pRequest->kit_items);
                    $company = TermRelation::getCompanyInfoByUserId($pRequest->company_user_id);
                    if($company) {
                        $pRequest->company_name = $company->company_name;
                        $pRequest->company_device_id = $company->company_device_id;
                        $pRequest->company_user_name = $company->user_name;
                        $pRequest->user_designation = $company->designation;
                    }
                }
            }
            return ['success'=>true,'data'=>$pendingRequest];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }


    /*
     * ==============
     * QUARTER MASTER
     * ==============
     */
    public function quarterMasterPendingRequest(Request $request){
        try{
            $quarterMasterUser = $request->user();
            if(!$quarterMasterUser || !$quarterMasterUser->hasRole('quarter_master'))
                throw new Exception("Please try to login as Quarter Master user!");
            $pendingRequest = KitItemRequest::where([
                'quarter_master_user_id'=>$quarterMasterUser->id,
                'status'=>2
            ])->whereIn('stage', array(1,2,4,5))->get();

            foreach( $pendingRequest as $pRequest){
                $kitItems = \GuzzleHttp\json_decode($pRequest->kit_items);
                $pRequest->unit_office = TermRelation::getUnitInfoByUserId($pRequest->unit_user_id);
                if(count($kitItems) > 0 ){
                    foreach ($kitItems as $key=>$item ){
                        $kitItems[$key]->company = TermRelation::getCompanyInfoByUserId($item->company_user_id);
                    }
                }
                $pRequest->kit_items = $kitItems;
            }
            return ['success'=>true,'data'=>$pendingRequest];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
    /*
    * Approve request for unit level
    */
    public function approveUnitRequestByQuarterMaster(Request $request){
        try{
            $quarterMaster = $request->user();
            if(!$quarterMaster || !$quarterMaster->hasRole('quarter_master'))
                throw new Exception("You need to logged in as quarter master level!");
            if(!$request->input('request_id'))
                throw new Exception("Must be need request Id");
            $PendingRequest = KitItemRequest::where([
                'id'=>$request->input('request_id'),
                'quarter_master_user_id'=>$quarterMaster->id,
                'stage'=>1,
                'status'=>2
            ])->first();
            if(!$PendingRequest)
                throw new Exception("This request not found");
            $PendingRequest->stage = 2; // Approve
            $PendingRequest->save();
            // Send notification to the company
            return ['success'=>true, 'message'=> "Request approve success!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
    * Approve request for unit level
    */
    public function cancelUnitRequestByQuarterMaster(Request $request){
        try{
            $quarterMaster = $request->user();
            if(!$quarterMaster || !$quarterMaster->hasRole('quarter_master'))
                throw new Exception("You need to logged in as quarter master level!");
            if(!$request->input('request_id'))
                throw new Exception("Must be need request Id");
            $PendingRequest = KitItemRequest::where([
                'id'=>$request->input('request_id'),
                'quarter_master_user_id'=>$quarterMaster->id,
                'stage'=>1,
                'status'=>2
            ])->first();
            if(!$PendingRequest)
                throw new Exception("This request not found");
            $PendingRequest->stage = 3; // Approve
            $PendingRequest->save();
            // Send notification to the company
            return ['success'=>true, 'message'=> "Request cencel success!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
    * Send request quarter master to district/formation level
    * Check unit level request by user_id and stage=(1-5)
    * status = 3
    */

    public function requestQuarterMasterToDistrict(Request $request){
        try{
            $quarterMaster = $request->user(); // Get from auth
            if(!$quarterMaster || !$quarterMaster->hasRole('quarter_master'))
                throw new Exception("You need to logged in as quarter master level!");
            $terms = TermRelation::where(['user_id'=>$quarterMaster->id])->first();
            $quarterBoss = TermRelation::retrieveUnitDistrict($terms->district_office_id);
            $pendingRequest = KitItemRequest::where([
                'quarter_master_user_id'=>$quarterMaster->id,
                'stage'=>2,
                'status'=>2
            ])->get();

            if(count($pendingRequest) == 0)
                throw new Exception("Quarter master have not any accepted request");

            $districtLevelRequest = [];
            $parentIds = '';
            $condemnation_id = 0;
            $requestItems = 0;
            foreach($pendingRequest as $key=>$pRequest){
                $districtLevelRequest[$key]['unit_user_id'] = $pRequest->unit_user_id;
                $districtLevelRequest[$key]['kit_items'] = \GuzzleHttp\json_decode($pRequest->kit_items);
                $parentIds = $parentIds == '' ? $pRequest->id : $parentIds.','.$pRequest->id;
                $pRequest->stage = 4;
                $condemnation_id = $pRequest->condemnation_id;
                $requestItems +=$pRequest->request_items;
                $pRequest->save();
            }
            $newRequest = new KitItemRequest();
            $newRequest->condemnation_id = $condemnation_id;
            $newRequest->quarter_master_user_id = $quarterMaster->id;
            $newRequest->district_user_id = $quarterBoss->user_id;
            $newRequest->stage = 1;
            $newRequest->status = 3;
            $newRequest->parent_ids = $parentIds;
            $newRequest->request_items = $requestItems;
            $newRequest->kit_items = \GuzzleHttp\json_encode($districtLevelRequest);

            $newRequest->save();
            return ['success'=> true, 'message'=>"Request send to formation level!", 'data'=>$pendingRequest];

        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }

    /*
     * ================
     * DISTRICT LEVEL
     * =================
     */

    /*
    * Get all pending request by condemnation id
    */
    public function formationLevelPendingRequest(Request $request){
        try{
            $formationUser = $request->user();
            if(!$formationUser || !$formationUser->hasRole('formation'))
                throw new Exception("Please try to login as formation user!");

            $pendingRequest = KitItemRequest::where([
                'district_user_id'=>$formationUser->id,
                'status'=> 3 //formation
            ])->whereIn('stage', array(1,2,4,5))->get();

            if(count($pendingRequest) == 0 ){
                throw new Exception("Formation have not any pending request");
            }

            foreach( $pendingRequest as $pRequest){
                $kitItems = \GuzzleHttp\json_decode($pRequest->kit_items);
                $pRequest->quarter_master_office = TermRelation::getQuarterMasterInfoByUserId($pRequest->quarter_master_user_id);
                if(count($kitItems) > 0 ){
                    foreach ($kitItems as $key=>$item ){
                        $kitItems[$key]->unit_office = TermRelation::getUnitInfoByUserId($item->unit_user_id);
                        if(count($item->kit_items) > 0 ) {
                            foreach($item->kit_items as $k=>$sItem) {
                                $item->kit_items[$k]->company = TermRelation::getCompanyInfoByUserId($sItem->company_user_id);
                            }
                        }
                    }
                }
                $pRequest->kit_items = $kitItems;
            }
            return ['success'=>true,'data'=>$pendingRequest];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Approve request for unit level
     */
    public function approveQuarterMasterRequestByDistrict(Request $request){
        try{
            $formation = $request->user();
            if(!$formation || !$formation->hasRole('formation'))
                throw new Exception("You need to logged in as formation level!");
            if(!$request->input('request_id'))
                throw new Exception("Must be need request Id");
            $PendingRequest = KitItemRequest::where([
                'id'=>$request->input('request_id'),
                'district_user_id'=>$formation->id,
                'stage'=>1,
                'status'=>3
            ])->first();
            if(!$PendingRequest)
                throw new Exception("This request not found");
            $PendingRequest->stage = 2; // Approve
            $PendingRequest->save();
            // Send notification to the company
            return ['success'=>true, 'message'=> "Request approve success!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
    * Send request district to central level
    * Check district level request by user_id and stage=(1-5)
    * status = 2
    */

    public function requestDistrictToCentral(Request $request){
        try{
            $formationUser = $request->user(); // Get from auth
            if(!$formationUser || !$formationUser->hasRole('formation'))
                throw new Exception("You need to logged in as formation level!");
            $terms = TermRelation::where(['user_id'=>$formationUser->id])->first();
            $districtBoss = TermRelation::retrieveDistrictCentral($terms->central_office_id);
            $pendingRequest = KitItemRequest::where([
                'district_user_id'=>$formationUser->id,
                'stage'=>2,
                'status'=>3
            ])->get();

            if(count($pendingRequest) == 0)
                throw new Exception("Formation have not any accepted request");

            $districtLevelRequest = [];
            $parentIds = '';
            $condemnation_id = 0;
            $requestItems = 0;

            foreach($pendingRequest as $key=>$pRequest){
                $districtLevelRequest[$key]['unit_user_id'] = $pRequest->district_user_id;
                $districtLevelRequest[$key]['kit_items'] = \GuzzleHttp\json_decode($pRequest->kit_items);
                $parentIds = $parentIds == '' ? $pRequest->id : $parentIds.','.$pRequest->id;
                $pRequest->stage = 4;
                $condemnation_id = $pRequest->condemnation_id;
                $requestItems +=$pRequest->request_items;
                $pRequest->save();
            }
            $newRequest = new KitItemRequest();
            $newRequest->condemnation_id = $condemnation_id;
            $newRequest->district_user_id = $formationUser->id;
            $newRequest->central_user_id = $districtBoss->user_id;
            $newRequest->stage = 1;
            $newRequest->status = 4;
            $newRequest->parent_ids = $parentIds;
            $newRequest->request_items = $requestItems;
            $newRequest->kit_items = \GuzzleHttp\json_encode($districtLevelRequest);
            $newRequest->save();
            return ['success'=> true, 'message'=>"Request send to central level!", 'data'=>$pendingRequest];

        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }

    }
    /*
     * After approve by central office distribute Items to the unit
     */
    public function distributeItemToUnit(Request $request){
        try{
//            $pendingRequest = KitItemRequest::where([
//                'district_user_id'=>$formationUser->id,
//                'stage'=>2,
//                'status'=>2
//            ])->get();
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
    /*
     * ==============
     * CENTRAL OFFICE
     * ==============
     */

    /*
    * Get all pending request by condemnation id
    */
    public function centralLevelPendingRequest(Request $request){
        try{
            $centralUser = $request->user();
            if(!$centralUser || !$centralUser->hasRole('central'))
                throw new Exception("Please try to login as central user!");
            $unitTerms = TermRelation::retrieveCentralDistrictTerms($centralUser->id);

            $pendingRequest = KitItemRequest::where([
                'central_user_id'=>$centralUser->id,
                'status'=> 4 //formation
            ])->whereIn('stage', array(1,2,3))->get();

            if(count($pendingRequest) == 0 ){
                throw new Exception("Central have not any pending request");
            }

            foreach( $pendingRequest as $pRequest){
                $kitItems = \GuzzleHttp\json_decode($pRequest->kit_items);
                if(count($kitItems) > 0 ){
                    if(is_array($kitItems))
                    foreach ($kitItems as $key=>$subKitItem){
                        $kitItems[$key]->unit = TermRelation::getUnitInfoByUserId($subKitItem->unit_user_id);
                        if(is_array($subKitItem->kit_items)){
                            foreach($subKitItem->kit_items as $k=>$subSubKitItems){
                                $kitItems[$key]->kit_items[$k]->company = TermRelation::getCompanyInfoByUserId($subSubKitItems->company_user_id);
                            }
                        }
                    }
                }
                $pRequest->kit_items = $kitItems;
            }
            return ['success'=>true,'data'=>$pendingRequest, 'terms'=>$unitTerms];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Central will review each pending request that comes from district level
     */
    public function reviewPendingRequestById(Request $request){
        try{
            if(!$request->input('request_id'))
                throw new Exception("Must be need request Id");
            $centralUser = $request->user();
            if(!$centralUser || !$centralUser->hasRole('central'))
                throw new Exception("Please logged in as a central level");
            $pendingRequest = KitItemRequest::where([
                'id'=>$request->input('request_id'),
                'status'=> 4 //formation
            ])->whereIn('stage', array(1,2))->first();
            if(!$pendingRequest)
                throw new Exception("Sorry pending request not found");
            $centralTerms = TermRelation::where(['user_id'=>$centralUser->id,'role'=>1,'term_type'=>0])->first();
            $hasItems = KitItem::getFreeItemNumberByCentralOffice($centralTerms->central_office_id);
            return ['success'=>true, 'total_items'=>$hasItems, 'pendingRequest'=>$pendingRequest];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Accept pending request for district/formation
     */
    public function acceptPendingRequestForDistrict(Request $request){
        try{
            if(!$request->input('request_id'))
                throw new Exception("Must be need request Id");

            if(!$request->input('delivery_item_number'))
                throw new Exception("Must be need number of delivery items");

            $deliveryItems = (int)$request->input('delivery_item_number');

            $centralUser = $request->user();
            if(!$centralUser || !$centralUser->hasRole('central'))
                throw new Exception("Please logged in as a central level");

            $pendingRequest = KitItemRequest::where([
                'id'=>$request->input('request_id'),
                'status'=> 4 //formation
            ])->whereIn('stage', array(1,2))->first();

            $centralTerms = TermRelation::where(['user_id'=>$centralUser->id,'role'=>1,'term_type'=>0])->first();
            $centralItems = KitItem::getFreeItemNumberByCentralOffice($centralTerms->central_office_id);
            $itemDeliverable = floor($centralItems*66/100);
            if($itemDeliverable < $deliveryItems)
                throw new Exception("Sorry you do not have this amount of item");
            $pendingRequest->stage = 2;
            $pendingRequest->approval_items = $deliveryItems;
            $pendingRequest->save();

            $confirmToDistrictOffice = KitItemRequest::where([
                'id'=>$pendingRequest->parent_ids,
                'stage'=>4,
                'status'=>3
            ])->first();
            $confirmToDistrictOffice->approval_items = $deliveryItems;
            $confirmToDistrictOffice->stage = 5;
            $confirmToDistrictOffice->save();
            // Send notification
            return ['success'=>true,"message"=>"Approve successful!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

}
