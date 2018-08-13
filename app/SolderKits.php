<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SolderKits extends Model
{
    protected $table = "solder_kits";

    protected $fillable = [
        'user_id',
        'item_id',
        'item_type_id',
        'issue_date',
        'expire_date'
    ];
}
