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

    public function changeParameters(Request $request)
    {
        $session_id = DB::table('sessions')->insertGetId(
            ['MPRparameters_0' => $request->input('safetystock_A0'),
             'MPRparameters_1' => $request->input('safetystock_B0'),
             'MPRparameters_2' => $request->input('safetystock_C0'),
             'MPRparameters_3' => $request->input('safetystock_D0'),
             'MPRparameters_4' => $request->input('safetystock_D1'),
             'MPRparameters_5' => $request->input('safetystock_E0'),
             'MPRparameters_6' => $request->input('safetystock_E1'),
             'MPRparameters_7' => $request->input('safetystock_E2'),
             'MPRparameters_8' => $request->input('lotsize_A0'),
             'MPRparameters_9' => $request->input('lotsize_B0'),
             'MPRparameters_10' => $request->input('lotsize_C0'),
             'MPRparameters_11' => $request->input('lotsize_D0'),
             'MPRparameters_12' => $request->input('lotsize_D1'),
             'MPRparameters_13' => $request->input('lotsize_E0'),
             'MPRparameters_14' => $request->input('lotsize_E1'),
             'MPRparameters_15' => $request->input('lotsize_E2'),
             'MPRparameters_16' => $request->input('leadtime_A0'),
             'MPRparameters_17' => $request->input('leadtime_B0'),
             'MPRparameters_18' => $request->input('leadtime_C0'),
             'MPRparameters_19' => $request->input('leadtime_D0'),
             'MPRparameters_20' => $request->input('leadtime_D1'),
             'MPRparameters_21' => $request->input('leadtime_E0'),
             'MPRparameters_22' => $request->input('leadtime_E1'),
             'MPRparameters_23' => $request->input('leadtime_E2')]
        );

        return view('graph', compact('session_id'));
    }
}