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

    /*
     * Get central office with admin
     */
    public static function getOfficeWithAdmin(){
        $offices = self::all();
        if(count($offices) > 0 ){
            foreach($offices as $office){
                $where = ['central_office_id'=>$office->id,'role'=>1];
                $office->head = TermRelation::findMyAdmin($where);
                $office->office_name = $office->central_name;
            }
        }
        return $offices;
    }
}
