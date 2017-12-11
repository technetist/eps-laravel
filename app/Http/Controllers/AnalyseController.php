<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class AnalyseController
{
    public function index()
    {
        $sessions = DB::table('sessions')->get();
        $inventories = DB::table('inventories')->get();

        return view('analyse', compact('sessions', 'inventories'));
    }

}