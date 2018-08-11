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

    /**
     * Get the posts for the pages.
     */
    public function kitItems()
    {
        return $this->hasMany('App\KitItem');
    }

    /**
     * Get the posts for the pages.
     */
    public function districts()
    {
        return $this->hasMany('App\DistrictOffice');
    }
}
