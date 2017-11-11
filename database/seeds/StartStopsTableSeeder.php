<?php

use Illuminate\Database\Seeder;

class StartStopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('start_stops')->insert( [
            'parameter'=>'null',
            'startstop'=>false
        ] );
    }
}
