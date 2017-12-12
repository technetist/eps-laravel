<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class GraphController
{
    public function index()
    {
        $users = DB::table('stats')->where('status', 'active');

        return view('graph');
    }
}