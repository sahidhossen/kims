<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class KitItem extends Model
{


    protected $table = "kit_items";


    protected $fillable = [
        'central_office_id',
        'item_type_id',
        'image',
        'status' // 0 = new, 1 =
    ];


    /**
     * Get the item type that owns the item.
     */
    public function ItemType()
    {
        return $this->belongsTo('App\ItemType');
    }

    /**
     * Get the item type that owns the item.
     */
    public function centralOffice()
    {
        return $this->belongsTo('App\CentralOffice');
    }

    /*
     * Get kit item by central office
     * @params central_office_id, status
     *
     */
    public static function getKitItemByCentralOffice( $where ){
        $kitItem = self::where($where)->get();
        return $kitItem;
    }


    public static function getFreeItemNumberByCentralOffice($central_id){
        $kiteItems = self::where(['central_office_id'=>$central_id,'status'=>0])->count();
        return $kiteItems;
    }


    public static function getKitItemsByIds($ids){
        $items = DB::table('kit_items')
                ->leftJoin('item_types','kit_items.item_type_id','=','item_types.id')
                ->whereIn('kit_items.id',$ids)
                ->select('kit_items.*','item_types.type_name','item_types.type_slug')
                ->get();
        return $items;
    }

}
