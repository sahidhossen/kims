<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $table = "units";

    protected $fillable = [
        'central_office_id',
        'district_office_id',
        'unit_name',
        'unit_details'
    ];

    /**
     * Get the posts for the pages.
     */
    public function companies()
    {
        return $this->hasMany('App\Company');
    }

    /**
     * Get the item type that owns the item.
     */
    public function district()
    {
        return $this->belongsTo('App\DistrictOffice');
    }

    /**
     * Get the item type that owns the item.
     */
    public function central()
    {
        return $this->belongsTo('App\CentralOffice');
    }
}
