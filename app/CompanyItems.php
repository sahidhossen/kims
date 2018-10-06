<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\ItemType;

class CompanyItems extends Model
{
    protected $table = "company_items";

    protected $fillable = [
        'company_id',
        'item_slug',
        'item_name',
        'items',
        'total_items'
    ];

    /*
     * action=1 (add)
     * action=2 (minus)
     *
     * company_id = company_office_id
     */
    public static function updateUnitItems($type_id, $company_id, $action=1, $items=1){
        $itemType = ItemType::find($type_id);
        if($action == 1) {
            $centralItems = self::where(['item_slug'=>$itemType->type_slug, 'company_id'=>$company_id])->first();
            if($centralItems){
                $centralItems->items = $centralItems->items+$items;
            }else{
                if($company_id === null )
                    return false;
                $centralItems = new CompanyItems();
                $centralItems->company_id = $company_id;
                $centralItems->item_slug = $itemType->type_slug;
                $centralItems->item_name = $itemType->type_name;
                $centralItems->items = $items;
                $centralItems->comment = 'condemnation';
            }
            $centralItems->save();
            return true;
        }
        if( $action == 2 ){
            $centralItems = self::where(['item_slug'=>$itemType->type_slug, 'company_id'=>$company_id])->first();
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
