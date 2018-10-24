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

    /*
    * Get office with admin
    */
    public static function getOfficesWithAdmin(){
        $offices = self::all();
        if(count($offices) > 0 ){
            foreach($offices as $office){
                $where = ['unit_id'=>$office->id,'role'=>3];
                $office->head = TermRelation::findMyAdmin($where);
                $office->office_name = $office->unit_name;
            }
        }
        return $offices;
    }
}
