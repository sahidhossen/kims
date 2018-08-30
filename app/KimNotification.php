<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use LaravelFCM\Facades\FCM;
use Illuminate\Support\Facades\Log;

class KimNotification extends Model
{
    public static function sendDownstreamMessage(){
        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60*20);

        $notificationBuilder = new PayloadNotificationBuilder('Check from kim');
        $notificationBuilder->setBody('Hello this is first notification')
            ->setSound('default');

        $dataBuilder = new PayloadDataBuilder();
        $dataBuilder->addData(['id' => '93843']);

        $option = $optionBuilder->build();
        $notification = $notificationBuilder->build();
        $data = $dataBuilder->build();

        $token = "key=AIzaSyBDXEAPoc1hGwM6iudq5zCoQXeGNd921X4";

        $downstreamResponse = FCM::sendTo($token, $option, $notification, $data);

        Log::info("push succsss: ". $downstreamResponse->numberSuccess());
        Log::info("Fail push: ". $downstreamResponse->numberFailure());
        $downstreamResponse->tokensToDelete();

//        $downstreamResponse->numberSuccess();
//        $downstreamResponse->numberFailure();
        return $downstreamResponse;

    }
}
