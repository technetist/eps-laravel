<?php

use Illuminate\Database\Seeder;

class InventoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('inventories')->insert( [
            'A0'=>'16',
            'B0'=>'8',
            'C0'=>'8',
            'D0'=>'16',
            'D1'=>'0',
            'E0'=>'0',
            'E1'=>'0',
            'E2'=>'0',
        ] );
    }
}
