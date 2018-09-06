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
     * @fields(solder_kit_id, request_type, comments)
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
           $newRequest->comments = $request->input('comments');
           if( $request->input('request_type') === 'company' )
               $newRequest->status = 1; // Request for new item and approve from company
           $newRequest->save();

           // Change solder kit status 1 for pending mode
           $actionItem->status = 1;
           $actionItem->save();

           // Send solder notification after accept new kit item request
           $notificationSend = KimNotification::sendDownstreamMessage();
           return ['success'=>true, 'message'=>"Request send to the company. Will review as soon as possible!", 'notification'=>$notificationSend->numberSuccess()];
       }catch (Exception $e){
           return ['success'=>false, 'message'=>$e->getMessage()];
       }
   }

    /*
    * Approve solder to company request by company user
    */
    public function companyApproveRequest(Request $request){
        try{
            if( !$request->input('solder_request_id'))
                throw new Exception("Must be need request ID");
            $currentRequest = SolderItemRequest::find( $request->input('solder_request_id'));
            if( !$currentRequest )
                throw new Exception("Sorry didn't find your request data");
            $currentRequest->status = 1;
            $currentRequest->save();
            return ['success'=>true ,'message'=>'Approve successful!'];
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
           if( !$request->input('solder_request_id'))
               throw new Exception("Must be need request ID");
           $currentRequest = SolderItemRequest::find( $request->input('solder_request_id'));
           if( !$currentRequest )
               throw new Exception("Sorry didn't find your request data");
           $currentRequest->status = 3;
           $currentRequest->save();
           $actionItem = SolderKits::find( $currentRequest->solder_kit_id );
           $actionItem->status = 0;
           $actionItem->save();
           return ['success'=>true ,'message'=>'Item request cancel!'];
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
    public function solderPendingRequest(Request $request){
        try{
            if(!$request->input('company_id'))
                throw new Exception("Company Id required!");

            $allPendingRequest = SolderItemRequest::where([
                'company_id'=>$request->input('company_id')
            ])->whereIn('status', [0,1])->get();
            $result = [];
            if(count($allPendingRequest) > 0 ){
                foreach( $allPendingRequest as $p_item ){
                    $item = SolderKits::find( $p_item->solder_kit_id );
                    $itemType = ItemType::find($item->item_type_id);

                    $item_property = new \stdClass();

                    $item_property->id = $p_item->id;
                    $item_property->type_name = $itemType->type_name;
                    $item_property->user_name = User::getParams($p_item->user_id, 'name');
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
            $validator = Validator::make($request->all(), [
                'company_id' => 'required',
                'user_id'=>'required',
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

            // Get all solder request that approve by company
            $allPendingRequest = SolderItemRequest::where([
                'company_id'=>$request->input('company_id'),
                'status'=>1
            ])->get();

            if(count($allPendingRequest) === 0 )
                throw new Exception("Pending request not found!");

            // Get company term
            $company_term = TermRelation::where(['user_id'=>$request->input('user_id'), 'term_type'=>0])->first();

            $requestJsonData = array();
            $requestItems = 0;
            $collectedKitTypes = [];
            foreach( $allPendingRequest as $pendingRequest ){
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
            }


            if( count($requestJsonData) > 0 ) {
                $requestJsonData = (object) $requestJsonData;
                $requestJsonData->kit_types = $collectedKitTypes;
                // Check if it has already a request
                $unitRequest = KitItemRequest::where(['condemnation_id'=>$request->input('condemnation_id'),'company_id'=>$request->input('company_id')])->first();
                if(!$unitRequest )
                    $unitRequest = new KitItemRequest();
                $unitRequest->stage = 1;
                $unitRequest->request_items = $requestItems;
                $unitRequest->kit_items = \GuzzleHttp\json_encode($requestJsonData);
                $unitRequest->central_id = $company_term->central_office_id;
                $unitRequest->district_id = $company_term->district_office_id;
                $unitRequest->unit_id = $company_term->unit_id;
                $unitRequest->company_id = $company_term->company_id;
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
     * Send request unit to district/formation level
     * Check unit level request by user_id and stage=1
     * User_id will find the unit_id
     * and now check if this unit_id had active pending request
     * If it has pending request for current condemnation_id then collect them
     * and send to the district/formation level
     */

    public function requestUnitToDistrict(Request $request){

    }

    public function unitLevelPendingRequest(Request $request){
        try{
            if(!$request->input('user_id'))
                throw new Exception("Must be need user Id");

            $unitTerms = TermRelation::retrieveUnitTerms($request->input('user_id'));
            $unitCompanies = [];
            if( count( $unitTerms) > 0 ){
                foreach( $unitTerms as $term ){
                    $user = User::find( $term->user_id );
                    if($user->hasRole('company')) {
                        $user->company_id = $term->company_id;
                        $user->unit_id = $term->unit_id;
                        array_push($unitCompanies, $user);
                    }
                }
                if(count($unitCompanies) > 0 ){
                    foreach( $unitCompanies as $key=>$company){
                        $unitCompanies[$key]['pending_request'] = KitItemRequest::getUnitItemPendingRequestByCompany($company->company_id, $company->unit_id);
                    }
                }
            }

            return ['success'=>true,'data'=>$unitCompanies];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

}
