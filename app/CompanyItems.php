<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
