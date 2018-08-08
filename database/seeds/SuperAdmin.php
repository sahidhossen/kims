<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;

class SuperAdmin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name='OrangeBox';
        $user->secret_id='orange007';
        $user->password=bcrypt("orange007");
        $user->save();

        $rootRole = Role::where('name','=','kit_admin')->first();
        $user->attachRole($rootRole);
    }
}
