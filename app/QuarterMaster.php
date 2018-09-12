<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuarterMaster extends Model
{
    protected $table = "quarter_master";

    protected $fillable = [
        'central_office_id',
        'district_office_id',
        'quarter_name',
        'quarter_details'
    ];
}
