<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemType extends Model
{
    protected $table = "item_types";

    protected $fillable = [
        'type_name',
        'details',
        'status'
    ];

    /**
     * Get the posts for the pages.
     */
    public function kitItems()
    {
        return $this->hasMany('App\KitItem');
    }
}
