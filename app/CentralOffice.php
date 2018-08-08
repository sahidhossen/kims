<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CentralOffice extends Model
{
    protected $table = "central_offices";

    protected $fillable = [
        'central_name',
        'central_details'
    ];
}
