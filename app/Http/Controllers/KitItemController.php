<?php

namespace App\Http\Controllers;

use App\CentralOffice;
use App\ItemType;
use App\KitItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use League\Flysystem\Exception;

class KitItemController extends Controller
{


    /*
     * @status = 0->new, 1->assigned_to_solder, 2->assign_to_unit
     *
     *
     */

    /*
     * Add kit item to the solder
     * @item_type_id = Item Type id
     * @central_office_id = Who provide the item
     *
     */
    public function store(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'item_type_id' => 'required|numeric',
                'central_office_id' => 'required|numeric',
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

            $kitItem = new KitItem();
            $kitItem->item_type_id = $request->input('item_type_id');
//            $kitItem->condemnation_id = $request->input('condemnation_id');
            $kitItem->central_office_id = $request->input('central_office_id');
            $kitItem->status = 0;
            $result = new \stdClass();
            if($kitItem->save()){
                $result->kit_name = $kitItem->ItemType->type_name;
                $result->central_office_name = $kitItem->centralOffice->central_name;
                $result->status = $kitItem->status;
                $result->image = $kitItem->image;
            }

            return ['success'=>true, 'data'=>$result, 'message'=>'Kit item save!'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    public function update(Request $request ){
        try {
            if( !$request->input('item_id'))
                throw new Exception("Kit Item Id must be need");
            $kitItem = KitItem::find( $request->input('item_id'));
            if( !$kitItem )
                throw new Exception("Sorry kit item now found");
            $kit_type_id = $request->input('kit_type_id');
            $central_office_id = $request->input('central_office_id');

            if( $kit_type_id ){
                $kitType = ItemType::find( $kit_type_id);
                if(!$kitType)
                    throw new Exception("Invalid kit type id");
                $kitItem->item_type_id = $kit_type_id;
            }

            if($central_office_id){
                $centralOffice = CentralOffice::find( $central_office_id );
                if(!$centralOffice)
                    throw new Exception("Invalid central office id!");
                $kitItem->central_office_id = $central_office_id;
            }

            $kitItem->status = $request->input('status') ? $request->input('status') : $kitItem->status;
            $kitItem->save();
            return ['success'=>true, 'data'=>$kitItem, 'message'=>'Kit item update!'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Get All kit item by central office ID Or, kit type id or Both
     *
     */
    public function kitItemsByQuery( Request $request ){
        try{
            $central_office_id = $request->input('central_office_id');
            $item_type_id =  $request->input('item_type_id');
            $status = $request->input('status') ? $request->input('status') : 0;
            if( !$central_office_id && !$item_type_id )
                throw new Exception("Central office ID Or Kit type id required required");

            $whereClouse = [];

            if( $central_office_id && $item_type_id ){
                $whereClouse = ['central_office_id'=>$central_office_id, 'item_type_id'=> $item_type_id];
            }elseif( $central_office_id ){
                $whereClouse = ['central_office_id' => $central_office_id];
            }elseif( $item_type_id ){
                $whereClouse = ['item_type_id'=> $item_type_id];
            }

            $whereClouse['status']= $status;

            $kitItems = KitItem::getKitItemByCentralOffice($whereClouse);

            $object = [];
            if( count($kitItems) > 0 ){
                foreach( $kitItems as $kitItem){
                    $kitItemObj = new \stdClass();
                    $kitItemObj->id  = $kitItem->id;
                    $kitItemObj->kit_name = $kitItem->ItemType->type_name;
                    $kitItemObj->central_office_name = $kitItem->centralOffice->central_name;
                    $kitItemObj->status = $kitItem->status;
                    $kitItemObj->image = $kitItem->image;
                    array_push($object, $kitItemObj);
                }
            }

            return ['success'=>true, 'data'=>$object,'message'=>'Central office data retrieve'];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Get All Kit Item
     */
    public function getAllKitItems(Request $request){
        try{

            $kitItems = KitItem::orderBy('created_at', 'desc')->get();
            $result = [];
            if( count($kitItems) > 0 ){
                foreach ($kitItems as $kitItem ){
                    $kitItemObj = new \stdClass();
                    $kitItemObj->kit_name = $kitItem->ItemType->type_name;
                    $kitItemObj->central_office_name = $kitItem->centralOffice->central_name;
                    $kitItemObj->status = $kitItem->status;
                    $kitItemObj->image = $kitItem->image;
                    array_push($result, $kitItemObj);
                }
            }
            return ['success'=>true, 'message'=>"All kit items", 'data'=>$result];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Get All Kit Item
     */
    public function getAllActiveKitItems(){
        try{

            $kitItems = KitItem::where(['status'=>0])->orderBy('created_at', 'desc')->get();
            $result = [];
            $collectedKitTypes = [];
            if( count($kitItems) > 0 ){
                foreach ($kitItems as $kitItem ){
                    $kitItemObj = new \stdClass();
                    $kitItemObj->kit_name = $kitItem->ItemType->type_name;
                    $kitItemObj->central_office_name = $kitItem->centralOffice->central_name;
                    $kitItemObj->status = $kitItem->status;
                    $kitItemObj->image = $kitItem->image;
                    if(isset($collectedKitTypes[$kitItemObj->kit_name])){
                        array_push($collectedKitTypes[$kitItemObj->kit_name], $kitItemObj);
                    }else {
                        $collectedKitTypes[$kitItemObj->kit_name] = array($kitItemObj);
                    }
                }
                if(count($collectedKitTypes) > 0 ){
                    foreach( $collectedKitTypes as $type_name=>$types ){
                        array_push($result, ['kit_name'=>$type_name,'quantity'=>count($types), 'items'=>$types]);
                    }
                }
            }
            return ['success'=>true, 'message'=>"All kit items", 'data'=>$result];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * get Item by Item ID
     */
    public function itemById(Request $request){
        try{
            if( !$request->input('item_id') )
                throw  new Exception("Item Id required for retrieve item");
            $item = KitItem::find($request->input('item_id'));
            if( !$item )
                throw  new Exception("Item not found!");
            $item->ItemType;
            $item->centralOffice;
            return ['success'=>true, 'data'=>$item, 'message'=>"Item Found!" ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Delete kit item
     */
    public function delete(Request $request){
        try{
            if( !$request->input('item_id') )
                throw  new Exception("Item Id required for retrieve item");
            $kitItem = KitItem::find( $request->input('item_id'));
            if(!$kitItem)
                throw new Exception("Sorry item not found with this ID");
            $kitItem->delete();
            return ['success'=>true, 'data'=>$kitItem, 'message'=>"Kit Item delete Success!" ];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }
}
