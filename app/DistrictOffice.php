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

    /*
     * Get district office with admin
     */
    public static function getOfficesWithAdmin(){
        $offices = self::all();
        if(count($offices) > 0 ){
            foreach($offices as $office){
                $where = ['district_office_id'=>$office->id,'role'=>2];
                $office->head = TermRelation::findMyAdmin($where);
                $office->office_name = $office->district_name;
            }
        }
        return $offices;
    }
}
