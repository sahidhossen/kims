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

    /*
    * Get office with admin
    */
    public static function getOfficesWithAdmin(){
        $offices = self::all();
        if(count($offices) > 0 ){
            foreach($offices as $office){
                $where = ['company_id'=>$office->id,'role'=>4];
                $office->head = TermRelation::findMyAdmin($where);
                $office->office_name = $office->company_name;
            }
        }
        return $offices;
    }
}
