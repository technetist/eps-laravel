<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class GraphController
{

    public function index()
    {
        $users = DB::table('stats')->where('status', 'active');

        return view('graph');
    }

    public function changeParametersView()
    {

        $last_session = DB::table('sessions')->orderby('id', 'desc')->first();

        if($last_session->sessionName == "" || $last_session->sessionName == null ){
            return view('change_parameters', compact( 'last_session'));
        }

        else{
            DB::table('sessions')->insert(
                ['CONWIPparameters_0' => 0,
                    'CONWIPparameters_1' => 0,
                    'KANBANparameters_0' => 0,
                    'KANBANparameters_1' => 0,
                    'KANBANparameters_2' => 0,
                    'KANBANparameters_3' => 0,
                    'KANBANparameters_4' => 0,
                    'KANBANparameters_5' => 0,
                    'KANBANparameters_6' => 0,
                    'KANBANparameters_7' => 0,
                    'KANBANparameters_8' => 0,
                    'KANBANparameters_9' => 0,
                    'KANBANparameters_10' => 0,
                    'KANBANparameters_11' => 0,
                    'KANBANparameters_12' => 0,
                    'KANBANparameters_13' => 0,
                    'KANBANparameters_14' => 0,
                    'KANBANparameters_15' => 0,
                    'MRPparameters_0' => 0,
                    'MRPparameters_1' => 0,
                    'MRPparameters_2' => 0,
                    'MRPparameters_3' => 0,
                    'MRPparameters_4' => 0,
                    'MRPparameters_5' => 0,
                    'MRPparameters_6' => 0,
                    'MRPparameters_7' => 0,
                    'MRPparameters_8' => 8,
                    'MRPparameters_9' => 8,
                    'MRPparameters_10' => 8,
                    'MRPparameters_11' => 8,
                    'MRPparameters_12' => 8,
                    'MRPparameters_13' => 8,
                    'MRPparameters_14' => 8,
                    'MRPparameters_15' => 8,
                    'MRPparameters_16' => 120,
                    'MRPparameters_17' => 120,
                    'MRPparameters_18' => 120,
                    'MRPparameters_19' => 120,
                    'MRPparameters_20' => 120,
                    'MRPparameters_21' => 120,
                    'MRPparameters_22' => 120,
                    'MRPparameters_23' => 120,
                    'averageFgi' => 0,
                    'averageInv' => 0,
                    'averageWip' => 0,
                    'average_utilisation' => 0,
                    'planningAlgoritm' => '',
                    'serviceLevel' => 0,
                    'sessionName' => '',
                    'timePerPiece' => '0',
                    'timePerPiece_M1' => 0,
                    'timePerPiece_M2' => 0,
                    'timePerPiece_M3' => 0,
                    'timePerPiece_M4' => 0,
                    'timePerPiece_M5' => 0,
                    'total_time' => 0,
                    'utilisation_M1' => 0,
                    'utilisation_M2' => 0,
                    'utilisation_M3' => 0,
                    'utilisation_M4' => 0,
                    'utilisation_M5' => 0,
                ]
            );

            $last_session = DB::table('sessions')->orderby('id', 'desc')->first();
            return view('change_parameters', compact( 'last_session'));

        }
    }

    public function changeParameters(Request $request)
    {
        $last_session = DB::table('sessions')->orderby('id', 'desc')->first();


            DB::table('sessions')->where('id', $last_session->id)->update(
                ['MRPparameters_0' => $request->input('safetystock_A0'),
                    'MRPparameters_1' => $request->input('safetystock_B0'),
                    'MRPparameters_2' => $request->input('safetystock_C0'),
                    'MRPparameters_3' => $request->input('safetystock_D0'),
                    'MRPparameters_4' => $request->input('safetystock_D1'),
                    'MRPparameters_5' => $request->input('safetystock_E0'),
                    'MRPparameters_6' => $request->input('safetystock_E1'),
                    'MRPparameters_7' => $request->input('safetystock_E2'),
                    'MRPparameters_8' => $request->input('lotsize_A0'),
                    'MRPparameters_9' => $request->input('lotsize_B0'),
                    'MRPparameters_10' => $request->input('lotsize_C0'),
                    'MRPparameters_11' => $request->input('lotsize_D0'),
                    'MRPparameters_12' => $request->input('lotsize_D1'),
                    'MRPparameters_13' => $request->input('lotsize_E0'),
                    'MRPparameters_14' => $request->input('lotsize_E1'),
                    'MRPparameters_15' => $request->input('lotsize_E2'),
                    'MRPparameters_16' => $request->input('leadtime_A0'),
                    'MRPparameters_17' => $request->input('leadtime_B0'),
                    'MRPparameters_18' => $request->input('leadtime_C0'),
                    'MRPparameters_19' => $request->input('leadtime_D0'),
                    'MRPparameters_20' => $request->input('leadtime_D1'),
                    'MRPparameters_21' => $request->input('leadtime_E0'),
                    'MRPparameters_22' => $request->input('leadtime_E1'),
                    'MRPparameters_23' => $request->input('leadtime_E2')]);



        return view('graph', compact('session_id'));
    }
}