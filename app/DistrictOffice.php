<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DistrictOffice extends Model
{
    protected $table = "district_offices";

    protected $fillable = [
        'district_name',
        'district_details'
    ];
}
