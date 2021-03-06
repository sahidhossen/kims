<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SolderKits extends Model
{
    protected $table = "solder_kits";

    protected $fillable = [
        'user_id',
        'item_id',
        'item_type_id',
        'issue_date',
        'expire_date',
        'status' //0=new, 1=wait(for review), 2=pending, 0=approve, -1=dump, 3=cancel/re-use 4=changed/expired
    ];

}
