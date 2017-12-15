<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyseController
{
    public function index(Request $request)
    {
        $allSessions = DB::table('sessions')->get();
        $inventories = DB::table('inventories')->get();
        $search = $request->name;

        if($search == '' or $search == null ){
            $sessions = $allSessions;
        }

        else{
            $sessions = DB::table('sessions')->select('sessionName')->where('sessionName', 'like', "$search");

        }

        return view('analyse', compact('sessions', 'inventories'));
    }

}