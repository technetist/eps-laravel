<?php

use Illuminate\Database\Seeder;

class StatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stats')->insert( [
            'machine'=>'machine1',
            'status'=>'non-active'
        ] );
                    
        DB::table('stats')->insert( [
            'machine'=>'machine2',
            'status'=>'non-active'
        ] );
        
        DB::table('stats')->insert( [
            'machine'=>'machine3',
            'status'=>'non-active'
        ] );
        
        DB::table('stats')->insert( [
            'machine'=>'machine4',
            'status'=>'non-active'
        ] );
                    
        DB::table('stats')->insert( [
            'machine'=>'machine5',
            'status'=>'non-active'
        ] );
    }
}
