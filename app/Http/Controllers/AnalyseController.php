<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyseController
{
    public function index(Request $request)
    {
        $allSessions = DB::table('sessions')->orderby('created_at', 'desc')->get();
        $inventories = DB::table('inventories')->get();
        $search_input = $request->name;

        if($search_input == '' or $search_input == null){
            $sessions = $allSessions;
        }

        else{
            $sessions = DB::table('sessions')->where('sessionName', 'like', "%".$search_input."%")->get();
        }

        return view('analyse', compact('sessions', 'inventories'));
    }

}