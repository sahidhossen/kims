<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use League\Flysystem\Exception;

class CentralItems extends Model
{
    protected $table = "central_items";

    protected $fillable = [
        'central_id',
        'item_slug',
        'item_name',
        'items',
        'total_items',
        ];

    /*
     * action=1 (add)
     * action=2 (minus)
     *
     * central_id = central_office_id
     */
    public static function updateCentralItems($type_id, $central_id, $action=1, $items=1){
        $itemType = ItemType::find($type_id);
        if($action == 1) {
            $centralItems = self::where(['item_slug'=>$itemType->type_slug, 'central_id'=>$central_id])->first();
            if($centralItems){
                $centralItems->items = $centralItems->items+$items;
            }else{
                if($central_id === null )
                    return false;
                $centralItems = new CentralItems();
                $centralItems->central_id = $central_id;
                $centralItems->item_slug = $itemType->type_slug;
                $centralItems->item_name = $itemType->type_name;
                $centralItems->items = $items;
            }
            $centralItems->save();
            return true;
        }
        if( $action == 2 ){
            $centralItems = self::where(['item_slug'=>$itemType->type_slug, 'central_id'=>$central_id])->first();
            if($centralItems) {
                $centralItems->items = abs($centralItems->items - $items);
                $centralItems->save();
                return true;
            }
            return false;
        }
        return false;
    }

    /*
     * Create item field when create a kit type
     */
    public static function createNewItemPosition($type_id, $central_id){
        try{
            $itemType = ItemType::find($type_id);
            $centralItems = new CentralItems();
            $centralItems->central_id = $central_id;
            $centralItems->item_slug = $itemType->type_slug;
            $centralItems->item_name = $itemType->type_name;
            $centralItems->items = 1;
            return true;
        }catch (Exception $e){
            return false;
        }
    }

    /*
     * Delete items when delete type form item type
     */

}
