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
            $itemType->type_slug = strtolower(str_replace(' ','_',$request->input('type_name')));
            $itemType->details = $request->input('details');

            $itemType->status =  $request->input('status') ? $request->input('status') : 0;
            $itemType->save();
            return ['success'=>true, 'data'=>$itemType, 'message'=>'Item Type Save!'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Move uploaded product to products directory
     * @return boolean
     * @params FILE, code
     */
    private function moveProductImage( $file, $type_name ){
        $user = Auth::user();
        $image_name = $file->getClientOriginalName();
        $extension = explode('.', $image_name);
        $extension = end($extension);
        $filter_name = str_replace(' ','_',$type_name) . '.' . $extension;
        $image_path = $user->id . '/' . Redis::get('agent_code_'.$user->id) . '/'.$filter_name;
        if(Storage::disk('uploads')->put($image_path, file_get_contents($file))) {
            return  $image_path;

        }

        return false;

    }

    public function update(Request $request){
        try{
            if( !$request->input('id'))
                throw new Exception("Type Id must be need");
            $itemType = ItemType::find( $request->input('id'));

            $typeName = $request->input('type_name');
            if( $typeName == '' )
                throw new Exception("Minimum type name length need 2");

            $itemType->type_name = $typeName;
            $itemType->details = $request->input('details') ? $request->input('details')  : $itemType->details;
            $itemType->problems = $request->input('problems') ? \GuzzleHttp\json_encode($request->input('problems')) : $itemType->problems;
            $itemType->status =  $request->input('status') ? $request->input('status') : $itemType->status;
            $itemType->save();
            $itemType->problems = \GuzzleHttp\json_decode($itemType->problems);
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
            $itemType->problems = $itemType->problems == null ? null : \GuzzleHttp\json_decode($itemType->problems);
            return ['success'=>true ,'data'=>$itemType, 'message'=>"Found item type"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    public function fetchAll(){
        try{
            $itemTypes = ItemType::all();
            if(count($itemTypes)>0){
                foreach( $itemTypes as $types ) {
                    if($types->problems != null ){
                        $types->problems = \GuzzleHttp\json_decode($types->problems);
                    }
                }
            }
            return ['success'=>true, 'data'=>$itemTypes,'message'=>"All item types"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
}
