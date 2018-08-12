<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = "company";

    protected $fillable = [
        'central_office_id',
        'district_office_id',
        'unit_id',
        'company_name',
        'company_details'
    ];

    /**
     * Get the item type that owns the item.
     */
    public function unit()
    {
        return $this->belongsTo('App\Unit');
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
