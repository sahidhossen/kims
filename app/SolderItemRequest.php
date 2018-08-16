<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SolderItemRequest extends Model
{
    protected $table = "solder_item_request";

    protected $fillable = [
        'user_id',
        'company_id',
        'item_id',
        'status'
    ];
}
