<?php

namespace App\Http\Controllers;

use App\ItemType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use League\Flysystem\Exception;

class ItemTypeController extends Controller
{
    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'type_name' => 'required|min:2|max:30',
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
            $itemType = new ItemType();
            $itemType->type_name = $request->input('type_name');
            $itemType->details = $request->input('details');
            $itemType->status =  $request->input('status') ? $request->input('status') : 0;
            $itemType->save();
            return ['success'=>true, 'data'=>$itemType, 'message'=>'Item Type Save!'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    public function update(Request $request){
        try{
            if( !$request->input('type_id'))
                throw new Exception("Type Id must be need");
            $itemType = ItemType::find( $request->input('type_id'));

            $typeName = $request->input('type_name');
            if( $typeName == '' )
                throw new Exception("Minimum type name length need 2");

            $itemType->type_name = $typeName;
            $itemType->details = $request->input('details') ? $request->input('details')  : $itemType->details;
            $itemType->status =  $request->input('status') ? $request->input('status') : $itemType->status;
            $itemType->save();
            return ['success'=>true, 'data'=>$itemType, 'message'=>'Item Type Update!'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    public function itemById( Request $request ){
        try{
            if( !$request->input('type_id'))
                throw  new Exception("Item Type Id required for retrieve district office");

            $itemType = ItemType::find($request->input('type_id'));
            if( !$itemType )
                throw new Exception("Item Type not found with this ID");

            return ['success'=>true ,'data'=>$itemType, 'message'=>"Found item type"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    public function fetchAll(){
        try{
            $itemTypes = ItemType::all();
            return ['success'=>true, 'data'=>$itemTypes,'message'=>"All item types"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
}
