<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use League\Flysystem\Exception;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, EntrustUserTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'secret_id', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    /*
     * Find user information based on secret_id
     * Laravel take primary field as email id but here I need secret_id
     */
    public function findForPassport($identifier) {
        try {
            $currentUser = $this->orWhere('secret_id', $identifier)->first();
            if(!$currentUser)
                return null;
            $currentUser->role = $currentUser->roles->first()->name;
            return $currentUser;
        }catch (Exception $e){
            return null;
        }
    }

    /*
     * Add user solder role
     */
    public function setRole( $roleName ){
        try{
            $newRole = Role::where('name','=',$roleName)->first();
            $this->attachRole($newRole);
            return true;
        }catch(Exception $e ){
            return false;
        }
    }

    /*
     * Update user role
     */
    public function deferAndAttachNewRole($user, $new_role) {
        try{
            // remove any roles tagged in this user.
            foreach ($this->roles as $userRole) {
                $this->roles()->detach($userRole);
            }
            // attach the new role using the `EntrustUserTrait` `attachRole()`
            $this->setRole($new_role);
            return true;
        }catch (Exception $e){
            return false;
        }

    }

    /*
     * Get user single info
     */
    public static function getParams($user_id, $name='name')
    {
        $user = User::find($user_id);
        if(isset($user->{$name}))
            return $user->{$name};
        return null;
    }



}
