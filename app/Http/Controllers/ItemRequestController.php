<?php

namespace App\Http\Controllers;

use App\KitItem;
use App\SolderItemRequest;
use App\SolderKits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use League\Flysystem\Exception;

class ItemRequestController extends Controller
{
    /*
     * Get request for new product
     */
   public function SolderRequest(Request $request){
       try{
           $validator = Validator::make($request->all(), [
               'user_id' => 'required',
               'company_id' => 'required',
               'item_id' => 'required'
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

           $newRequest = new SolderItemRequest();
           $newRequest->user_id = $request->input('user_id');
           $newRequest->company_id = $request->input('company_id');
           $newRequest->item_id = $request->input('item_id');
           $newRequest->comments = $request->input('comments');
           $newRequest->save();
           $actionItem = SolderKits::find( $newRequest->item_id );
           $actionItem->status = 1;
           $actionItem->save();
           return ['success'=>true, 'message'=>"Request send to the company. Will review as soon as possible!"];
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
           $actionItem = SolderKits::find( $currentRequest->item_id );
           $actionItem->status = 0;
           $actionItem->save();
           return ['success'=>true ,'message'=>'Item request cancel!'];
       }catch (Exception $e){
           return ['success'=>false, 'message'=>$e->getMessage()];
       }
   }

   /*
    * Approve solder to company request by company user
    */
   public function approveRequest(Request $request){
       try{
           if( !$request->input('solder_request_id'))
               throw new Exception("Must be need request ID");
           $currentRequest = SolderItemRequest::find( $request->input('solder_request_id'));
           if( !$currentRequest )
               throw new Exception("Sorry didn't find your request data");
           $currentRequest->status = 2;
           $currentRequest->save();
           return ['success'=>true ,'message'=>'Approve successful!'];
       }catch (Exception $e){
           return ['success'=>false, 'message'=>$e->getMessage()];
       }
   }

}
