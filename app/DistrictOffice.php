<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DistrictOffice extends Model
{
    protected $table = "district_offices";

    protected $fillable = [
        'central_office_id',
        'district_name',
        'district_details'
    ];

    /**
     * Get the item type that owns the item.
     */
    public function centralOffice()
    {
        return $this->belongsTo('App\CentralOffice');
    }

    /**
     * Get the posts for the pages.
     */
    public function units()
    {
        return $this->hasMany('App\Unit');
    }

    /**
     * Get the posts for the pages.
     */
    public function companies()
    {
        return $this->hasMany('App\Company');
    }
}
