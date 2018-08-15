<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
