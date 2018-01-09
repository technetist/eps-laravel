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

    public function changeParameters(Request $request){
        return view('graph');
    }
}