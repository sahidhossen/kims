<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
