<?php

use Illuminate\Database\Seeder;
use App\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new Role();
        $admin->name         = 'kit_admin';
        $admin->display_name = 'Kit Admin'; // optional
        $admin->description  = 'Admin of this application'; // optional
        $admin->save();

        $rhq = new Role();
        $rhq->name         = 'central';
        $rhq->display_name = 'CENTRAL Level'; // optional
        $rhq->description  = 'Regional Head Quarter'; // optional
        $rhq->save();

        $bojso = new Role();
        $bojso->name         = 'formation';
        $bojso->display_name = 'FORMATION Level'; // optional
        $bojso->description  = 'Upper then BQMS'; // optional
        $bojso->save();

        $bqms = new Role();
        $bqms->name         = 'unit';
        $bqms->display_name = 'UNIT Level'; // optional
        $bqms->description  = 'Upper then CQMS'; // optional
        $bqms->save();

        $cqms = new Role();
        $cqms->name         = 'company';
        $cqms->display_name = 'Company Level'; // optional
        $cqms->description  = 'Upper then Solder'; // optional
        $cqms->save();

        $solder = new Role();
        $solder->name         = 'solder';
        $solder->display_name = 'SOLDER'; // optional
        $solder->description  = 'Lowest level user'; // optional
        $solder->save();
    }
}
