<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\ItemType;
class UnitItems extends Model
{
    protected $table = "unit_items";

    protected $fillable = [
        'unit_id',
        'item_slug',
        'item_name',
        'items',
        'total_items'
    ];

    /*
     * action=1 (add)
     * action=2 (minus)
     *
     * central_id = central_office_id
     */
    public static function updateUnitItems($type_id, $unit_id, $action=1, $items=1){
        $itemType = ItemType::find($type_id);
        if($action == 1) {
            $centralItems = self::where(['item_slug'=>$itemType->type_slug, 'unit_id'=>$unit_id])->first();
            if($centralItems){
                $centralItems->items = $centralItems->items+$items;
            }else{
                if($unit_id === null )
                    return false;
                $centralItems = new UnitItems();
                $centralItems->unit_id = $unit_id;
                $centralItems->item_slug = $itemType->type_slug;
                $centralItems->item_name = $itemType->type_name;
                $centralItems->items = $items;
            }
            $centralItems->save();
            return true;
        }
        if( $action == 2 ){
            $centralItems = self::where(['item_slug'=>$itemType->type_slug, 'unit_id'=>$unit_id])->first();
            if($centralItems) {
                $centralItems->items = $centralItems->items - $items;
                $centralItems->save();
                return true;
            }
            return false;
        }
        return false;
    }
}
