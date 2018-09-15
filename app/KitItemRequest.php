<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KitItemRequest extends Model
{
    protected $table = "kit_item_request";


    /*
     * total stage will be 6 for processing hole item request procedure
     * ====UNIT====
     * stage = 1 (receive request company to unit)
     * stage = 2 (approve request)
     * stage = 3 (cancel request)
     * stage = 4 (send to formation/district level)
     * stage = 5 (approve by district)
     * stage = 6 (send feedback to company)
     *
     * ====FORMATION====
     * stage = 1 (receive request from unit)
     * stage = 2 (approve request)
     * stage = 3 (cancel request)
     * stage = 4 (send to central)
     * stage = 5 (approve by central)
     * stage = 6 (send feedback to unit)
     *
     * =======CENTRAL=========
     * stage = 1 (receive request from formation)
     * stage = 2 (approve request)
     * stage = 3 (cancel request)
     *
     *
     * =======STATUS=======
     * 1 = unit
     * 2 = quarter master
     * 3 = formation
     * 4 = center
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
    public static function getCompanyItemPendingRequest($company_user_id){
        $pendingRequests = self::where(['company_user_id'=> $company_user_id])
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
    public static function getUnitItemPendingRequestByCompany($unit_user_id, $status){
        $pendingRequests = self::where(['unit_user_id'=>$unit_user_id, 'status'=>$status])
                                ->whereIn('stage',array(1,2,4,5))
                                ->get();
        return $pendingRequests;
    }




}
