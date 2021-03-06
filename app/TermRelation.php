<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
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


    /*
     * Role = 0 -> super_admin
     * Role = 1 -> center
     * Role = 2 -> Formation
     * Role = 3 -> Unit
     * role = 4 -> Company
     * Role = 5 -> Solder
     */


    /*
     * get term items
     *
     */
    private static function parseRelatedTerms($term){
        $result = new \stdClass();
        if( $term->central_office_id )
            $result->centralOffice = CentralOffice::find( $term->central_office_id);
        else
            $result->centralOffice = null;
        if( $term->district_office_id )
            $result->districtOffice = DistrictOffice::find( $term->district_office_id);
        else
            $result->districtOffice = null;
        if( $term->unit_id )
            $result->unit = Unit::find( $term->unit_id );
        else
            $result->unit = null;
        if( $term->company_id )
            $result->company = Company::find( $term->company_id );
        else
            $result->company =  null;
        return $result;
    }

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
            if( isset($data['quarter_master_id']) && $data['quarter_master_id']){
                $newRelation->quarter_master_id = $data['quarter_master_id'];
            }
            if( isset($data['unit_id']) && $data['unit_id']){
                $newRelation->unit_id = $data['unit_id'];
            }
            if( isset($data['company_id']) && $data['company_id']){
                $newRelation->company_id = $data['company_id'];
            }
            if( isset($data['role']) && $data['role']){
                $newRelation->role = $data['role'];
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
     * Get Solder Company Head Information
     */
    public static function getSolderHead($company_id){
        if(!$company_id)
            return null;
        $companyInfo = DB::table('users')
                    ->leftJoin('term_relation','term_relation.user_id','=','users.id')
                    ->leftJoin('company','term_relation.company_id','=','company.id')
                    ->leftJoin('units','term_relation.unit_id','=','units.id')
                    ->where(['term_relation.company_id'=>$company_id,'term_relation.role'=>4])
                    ->select('term_relation.*',
                        'users.id as user_id','users.device_id as c_device_id','users.name as c_user_name',
                        'company.id as company_id','company.company_name as company_name',
                        'units.id as unit_id','units.unit_name as unit_name'
                    )
                    ->first();
        return $companyInfo;
    }

    /**
     * Get company solder terms  
     */
    public static function getCompanySolderTerms($company_user_id){
        if(!$company_user_id)
            return null;
        $companyTerms = self::where('user_id',$company_user_id)->first();
        $companySolderTerms = self::where(
                [
                    'company_id'=>$companyTerms->company_id,
                    'term_type'=>0,
                    'role' => 5
                ]
                )->where('user_id','!=',$company_user_id)->get();
        return $companySolderTerms;
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
                    'role' => 4
                ]
                )->where('user_id','!=',$user_id)->get();
        return $companySolderTerms;
    }
    /*
     * Retrive company solders terms
     */
    public static function retrieveCompanySoldersTerms($user_id){
        if(!$user_id)
            return null;
        $companyTerms = self::where('user_id',$user_id)->first();
        $companySolderTerms = self::where(
            [
                'company_id'=>$companyTerms->company_id,
                'term_type'=>0,
                'role' => 5
            ]
        )->where('user_id','!=',$user_id)->get();
        return $companySolderTerms;
    }
    /*
     * Get Company Boss(Unit User)
     */
    public static function getCompanyUnitUser($unit_id){
        if(!$unit_id)
            return null;
        $unitInfo = DB::table('term_relation')
                    ->leftJoin('users','term_relation.user_id','=','users.id')
                    ->leftJoin('units','term_relation.unit_id','=','units.id')
                    ->where(['term_relation.unit_id'=>$unit_id,'term_relation.role'=>3,'term_relation.term_type'=>0])
                    ->first();
        return $unitInfo;
    }


    /*
     * Get Unit Terms
     */
    public static function retrieveUnitCompaniesTerms($user_id){
        if(!$user_id)
            return null;
        $unitTerms = self::where('user_id',$user_id)->first();
        $unitCompanyTerms = self::where(
            [
                'unit_id'=> $unitTerms->unit_id,
                'term_type'=>0,
                'role' => 4
            ]
        )->where('user_id','!=',$user_id)->get();
        return $unitCompanyTerms;
    }


    /*
    * Find unit quarter master
    */
    public static function retrieveUnitQuarterMaster($quarter_master_id){
        if(!$quarter_master_id)
            return null;

        $districtUser = DB::table('term_relation')
            ->leftJoin('users','term_relation.user_id','=','users.id')
            ->leftJoin('quarter_master','term_relation.quarter_master_id','=','quarter_master.id')
            ->where(['term_relation.quarter_master_id'=>$quarter_master_id, 'term_relation.role'=>6, 'term_relation.term_type'=>0])
            ->first();
        return $districtUser;
    }


    /*
     * Find unit district
     */
    public static function retrieveUnitDistrict($district_office_id){
        if(!$district_office_id)
            return null;

        $districtUser = DB::table('term_relation')
            ->leftJoin('users','term_relation.user_id','=','users.id')
            ->leftJoin('district_offices','term_relation.district_office_id','=','district_offices.id')
            ->where(['term_relation.district_office_id'=>$district_office_id, 'term_relation.role'=>2, 'term_relation.term_type'=>0])
            ->first();
        return $districtUser;
    }


    /*
   * Get Quarter Master Units Terms
   */
    public static function retrieveQuarterMasterUnitsTerms($user_id){
        if(!$user_id)
            return null;
        $unitTerms = self::where('user_id',$user_id)->first();
        $unitSolderTerms = self::where(
            [
                'quarter_master_id'=>$unitTerms->quarter_master_id,
                'term_type'=>0,
                'role'=> 3
            ]
        )->where('user_id','!=',$user_id)->get();
        return $unitSolderTerms;
    }

    public static function retrieveQuarterFormation($district_office_id){
        if(!$district_office_id)
            return null;

        $districtUser = DB::table('term_relation')
            ->leftJoin('users','term_relation.user_id','=','users.id')
            ->leftJoin('district_offices','term_relation.district_office_id','=','district_offices.id')
            ->where(['term_relation.district_office_id'=>$district_office_id, 'term_relation.role'=>2, 'term_relation.term_type'=>0])
            ->first();
        return $districtUser;
    }

    /*
    * Find district Central
    */
    public static function retrieveDistrictCentral($central_office_id){
        if(!$central_office_id)
            return null;
        $CentralUser = DB::table('term_relation')
            ->leftJoin('users','term_relation.user_id','=','users.id')
            ->leftJoin('central_offices','term_relation.central_office_id','=','central_offices.id')
            ->where([ 'term_relation.central_office_id'=>$central_office_id, 'term_relation.role'=>1, 'term_relation.term_type'=>0])
            ->first();
        return $CentralUser;
    }

    /*
    * Get District/formation Units Terms
    */
    public static function retrieveDistrictQMsTerms($user_id){
        if(!$user_id)
            return null;
        $unitTerms = self::where('user_id',$user_id)->first();
        $unitSolderTerms = self::where(
            [
                'district_office_id'=>$unitTerms->district_office_id,
                'term_type'=>0,
                'role'=> 6
            ]
        )->where('user_id','!=',$user_id)->get();
        return $unitSolderTerms;
    }

    /*
    * Get District/formation Units Terms
    */
    public static function retrieveDistrictUnitsTerms($user_id){
        if(!$user_id)
            return null;
        $unitTerms = self::where('user_id',$user_id)->first();
        $unitSolderTerms = self::where(
            [
                'district_office_id'=>$unitTerms->district_office_id,
                'term_type'=>0,
                'role'=> 3
            ]
        )->where('user_id','!=',$user_id)->get();
        return $unitSolderTerms;
    }

    /*
   * Get District/formation Units Terms
   */
    public static function retrieveCentralDistrictTerms($user_id){
        if(!$user_id)
            return null;
        $centralTerms = self::where('user_id',$user_id)->first();
        $centralDistrictTerms = self::where(
            [
                'district_office_id'=>$centralTerms->central_office_id,
                'term_type'=>0,
                'role'=> 2
            ]
        )->where('user_id','!=',$user_id)->get();
        return $centralDistrictTerms;
    }

    /*
     * Get Company Information by user Id
     */
    public static function getCompanyInfoByUserId($user_id){
        $company = DB::table('term_relation')
            ->leftJoin('company', 'term_relation.company_id','=','company.id')
            ->leftJoin('users', 'users.id','=','term_relation.user_id')
            ->where(['term_relation.user_id'=>$user_id,'term_relation.term_type'=>0,'term_relation.role'=>4])
            ->select('term_relation.*','company.*','users.id as c_user_id','users.name as user_name','users.designation','users.device_id as company_device_id')
            ->first();
        return $company;
    }

    /*
     * Get Unit Information by user Id
     */
    public static function getUnitInfoByUserId($user_id){
        $unit = DB::table('term_relation')
            ->leftJoin('units', 'term_relation.unit_id','=','units.id')
            ->leftJoin('users', 'users.id','=','term_relation.user_id')
            ->where(['term_relation.user_id'=>$user_id,'term_relation.term_type'=>0,'term_relation.role'=>3])
            ->select('term_relation.*','units.*','users.id as c_user_id','users.name as user_name','users.designation','users.device_id as unit_device_id')
            ->first();
        return $unit;
    }

    /*
     * Get Quarter master Information by user Id
     */
    public static function getQuarterMasterInfoByUserId($user_id){
        $district = DB::table('term_relation')
            ->leftJoin('quarter_master', 'term_relation.quarter_master_id','=','quarter_master.id')
            ->leftJoin('users', 'users.id','=','term_relation.user_id')
            ->where(['term_relation.user_id'=>$user_id,'term_relation.term_type'=>0,'term_relation.role'=>6])
            ->select('term_relation.*','quarter_master.*','users.id as c_user_id','users.name as user_name','users.designation', 'users.device_id as qa_device_id')
            ->first();
        return $district;
    }

    /*
     * Get Formation Information by user Id
     */
    public static function getFormationInfoByUserId($user_id){
        $district = DB::table('term_relation')
            ->leftJoin('district_offices', 'term_relation.district_office_id','=','district_offices.id')
            ->leftJoin('users', 'users.id','=','term_relation.user_id')
            ->where(['term_relation.user_id'=>$user_id,'term_relation.term_type'=>0,'term_relation.role'=>2])
            ->select('term_relation.*','district_offices.*','users.id as c_user_id','users.name as user_name','users.designation')
            ->first();
        return $district;
    }
    /*
     * Get Central Information by user Id
     */
    public static function getCentralInfoByUserId($user_id){
        $central = DB::table('term_relation')
            ->leftJoin('central_offices', 'term_relation.central_office_id','=','central_offices.id')
            ->leftJoin('users', 'users.id','=','term_relation.user_id')
            ->where(['term_relation.user_id'=>$user_id,'term_relation.term_type'=>0,'term_relation.role'=>1])
            ->select('term_relation.*','central_offices.*','users.id as c_user_id','users.name as user_name','users.designation','users.device_id as central_device_id')
            ->first();
        return $central;
    }

    /*
     * retrieve condemnation term
     */
    public static function getCondemnationTerms($term_id){
        if(!$term_id)
            return null;
        $term = self::find($term_id);
        $parsedTerm = self::parseRelatedTerms($term);
        $result = new \stdClass();
        $result->central_name = $parsedTerm->centralOffice->central_name;
        $result->central_id = $parsedTerm->centralOffice->id;
        $result->district_name = $parsedTerm->districtOffice->district_name;
        $result->district_id = $parsedTerm->districtOffice->id;
        $result->unit_name = $parsedTerm->unit->unit_name;
        $result->unit_id = $parsedTerm->unit->id;
        return $result;
    }

    /*
     * Get condemnation by term query
     * query -> unit_id | central_office_id | district_id, term_type=1
     */
    public static function getCondemnationByTermQuery($where){
        if(!is_array($where))
            return null;
        $termsByUnitId = TermRelation::where($where)->get();
        $result = [];
        if(count($termsByUnitId)>0){
            foreach ($termsByUnitId as $term){
                $termObj = TermRelation::getCondemnationTerms($term->id);
                array_push($result, $termObj);
            }
        }
        return $result;
    }

    /*
    * Find my admin
    * admin=central_office, formation_office, quarter_master, unit, company
     * $whereClose['{admin}_office_id','role']
    */
    public static function findMyAdmin($whereClose){
        $whereClose['term_type'] = 0;
        $queryInfo = DB::table('users')
            ->leftJoin('term_relation','users.id','=','term_relation.user_id')
            ->where($whereClose)
            ->first();
        return $queryInfo;
    }
}
