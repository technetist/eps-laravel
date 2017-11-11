<?php

use Illuminate\Database\Seeder;

class SessionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sessions')->insert( [
            'CONWIPparameters_0'=>15,
            'CONWIPparameters_1'=>90,
            'KANBANparameters_0'=>2,
            'KANBANparameters_1'=>2,
            'KANBANparameters_10'=>2,
            'KANBANparameters_11'=>2,
            'KANBANparameters_12'=>2,
            'KANBANparameters_13'=>2,
            'KANBANparameters_14'=>2,
            'KANBANparameters_15'=>2,
            'KANBANparameters_2'=>2,
            'KANBANparameters_3'=>2,
            'KANBANparameters_4'=>2,
            'KANBANparameters_5'=>2,
            'KANBANparameters_6'=>2,
            'KANBANparameters_7'=>2,
            'KANBANparameters_8'=>2,
            'KANBANparameters_9'=>2,
            'MRPparameters_0'=>0,
            'MRPparameters_1'=>0,
            'MRPparameters_10'=>8,
            'MRPparameters_11'=>8,
            'MRPparameters_12'=>8,
            'MRPparameters_13'=>8,
            'MRPparameters_14'=>8,
            'MRPparameters_15'=>8,
            'MRPparameters_16'=>120,
            'MRPparameters_17'=>120,
            'MRPparameters_18'=>120,
            'MRPparameters_19'=>120,
            'MRPparameters_2'=>0,
            'MRPparameters_20'=>120,
            'MRPparameters_21'=>120,
            'MRPparameters_22'=>120,
            'MRPparameters_23'=>120,
            'MRPparameters_3'=>0,
            'MRPparameters_4'=>0,
            'MRPparameters_5'=>0,
            'MRPparameters_6'=>0,
            'MRPparameters_7'=>0,
            'MRPparameters_8'=>8,
            'MRPparameters_9'=>8,
            'averageFgi'=>9.645056726094003,
            'averageInv'=>9.645056726094003,
            'averageWip'=>0,
            'average_utilisation'=>0.5604521264181525,
            'leadtime'=>NULL,
            'planningAlgoritm'=>'MRP',
            'serviceLevel'=>0.95,
            'sessionName'=>'TestFelberbauer',
            'timePerPiece'=>0.46661299058960964,
            'timePerPiece_M1'=>0.3423338063063064,
            'timePerPiece_M2'=>0.03881770139513952,
            'timePerPiece_M3'=>0.04005280715571559,
            'timePerPiece_M4'=>0.04140356323132314,
            'timePerPiece_M5'=>0.00400511250112501,
            'total_time'=>617,
            'utilisation_M1'=>49,
            'utilisation_M2'=>56,
            'utilisation_M3'=>58,
            'utilisation_M4'=>60,
            'utilisation_M5'=>58
        ] );
    }
}
