<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use League\Flysystem\Exception;

class TermRelation extends Model
{
    protected $table = "term_relation";

    protected $fillable = [
        'user_id',
        'central_office_id',
        'district_office_id',
        'company_id',
        'unit_id'
    ];

    public static function isRelativeExists($user_id, $status ){
        $relative = self::where(['user_id'=>$user_id,'term_type'=>$status])->first();
        if($relative )
            return true;
        return false;
    }

    /*
     * Save relative
     */
    public static function createRelation($data){
        try{
            $newRelation = new TermRelation();
            if( isset($data['user_id']) && $data['user_id']){
                $newRelation->user_id = $data['user_id'];
            }
            if( isset($data['central_office_id']) && $data['central_office_id']){
                $newRelation->central_office_id = $data['central_office_id'];
            }
            if( isset($data['district_office_id']) && $data['district_office_id']){
                $newRelation->district_office_id = $data['district_office_id'];
            }
            if( isset($data['unit_id']) && $data['unit_id']){
                $newRelation->unit_id = $data['unit_id'];
            }
            if( isset($data['company_id']) && $data['company_id']){
                $newRelation->company_id = $data['company_id'];
            }
            if( isset($data['comments']) && $data['comments']){
                $newRelation->comments = $data['comments'];
            }
            $newRelation->save();
        }catch(Exception $e){
            return $e;
        }
    }

    /*
     * Get relation result
     */
    public static function retrieveSolderTerms($user_id){
        if(!$user_id)
            return null;
        $termRelation = self::where('user_id', $user_id)->first();
        $centralOffice = CentralOffice::find( $termRelation->central_office_id);
        $districtOffice = DistrictOffice::find( $termRelation->district_office_id);
        $unit = Unit::find( $termRelation->unit_id );
        $company = Company::find( $termRelation->company_id );

        $result = new \stdClass();
        $result->central_name = $centralOffice->central_name;
        $result->central_id = $centralOffice->id;
        $result->district_name = $districtOffice->district_name;
        $result->district_id = $districtOffice->id;
        $result->unit_name = $unit->unit_name;
        $result->unit_id = $unit->id;
        $result->company_name = $company->company_name;
        $result->company_id = $company->id;
        return $result;
    }

    /*
     * Get Company Terms
     */
    public static function retrieveCompanyTerms($user_id){
        if(!$user_id)
            return null;
        $companyTerms = self::where('user_id',$user_id)->first();
        $companySolderTerms = self::where(
                [
                    'company_id'=>$companyTerms->company_id,
                    'term_type'=>0,
                ]
                )->where('user_id','!=',$user_id)->get();
        return $companySolderTerms;
    }
}
