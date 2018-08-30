<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KitItemRequest extends Model
{
    protected $table = "kit_item_request";


    /*
     * total stage will be 6 for processing hole item request procedure
     * stage = 1 (company to unit request)
     * stage = 2 (unit to district request)
     * stage = 3 (district to central request)
     * stage = 4 (central to district approve)
     * stage = 5 (district to unit approve)
     * stage = 6 (unit to company approve) (close- unit,district)
     * stage = 7 done
     *
     * unit(1-5)
     * district(2-4)
     * central(3)
     * company(1-6)
     *
     */
    protected $fillable = [
        'condemnation_id', // optional
        'stage',
        'central_id',
        'district_id',
        'unit_id',
        'company_id',
        'kit_items', // json_object
        'request_items',
        'approval_items',
    ];

    /*
    * Get all company pending request that sent to the units,district,central
    *
    * company send stage = 1
    * district-receive request and send central = 2
    * central-receive and approve back to district=  3
    * district receive and approve = 4
    * unit receive and approve  = 5
     *
    * stage(1-6)
    */
    public static function getCompanyItemPendingRequest($company_id){
        $pendingRequests = self::where(['company_id'=> $company_id])
            ->whereBetween('stage',array(1,6))
            ->get();
        return $pendingRequests;
    }


    /*
     * Get all units pending request that send by company
     *
     * It will get all request that stay between (unit-central)
     *
     * company send stage = 1
     * district-receive request and send central = 2
     * central-receive and approve back to district=  3
     * district receive and approve = 4
     * unit receive and approve = 5
     *
     * stage(1-5)
     */
    public static function getUnitItemPendingRequestByCompany($company_id, $unit_id){
        $pendingRequests = self::where(['company_id'=> $company_id, 'unit_id'=>$unit_id])
                                ->whereBetween('stage',array(1,5))
                                ->get();
        return $pendingRequests;
    }

    /*
     * Get all district pending request that send by unit
     *
     * It will get all request that stay between (district-central)
     *
     * district-receive request and send central = 2
     * central-receive and approve back to district=  3
     * district receive and approve = 4
     *
     * stage(2-4)
     */
    public static function getDistrictItemPendingRequestByUnit($unit_id, $district_id){
        $pendingRequests = self::where(['unit_id'=> $unit_id, 'district_id'=>$district_id])
            ->whereBetween('stage',array(2,4))
            ->get();
        return $pendingRequests;
    }

    /*
     * Get all central pending request that send by district
     *
     * It will get all request that stay only central level
     *
     * central-receive and approve back to district=  3
     *
     * stage(4)
     */
    public static function getCentralItemPendingRequestByDistrict($district_id, $central_id){
        $pendingRequests = self::where(['district_id'=> $district_id, 'central_id'=>$central_id, 'stage'=>3])->get();
        return $pendingRequests;
    }




}
