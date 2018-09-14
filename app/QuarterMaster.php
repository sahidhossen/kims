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

    /*
    * Get central office with admin
    */
    public static function getOfficeWithAdmin(){
        $offices = self::all();
        if(count($offices) > 0 ){
            foreach($offices as $office){
                $where = ['quarter_master_id'=>$office->id,'role'=>6];
                $office->head = TermRelation::findMyAdmin($where);
            }
        }
        return $offices;
    }
}
