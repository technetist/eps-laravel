<?php
/**
 * Created by PhpStorm.
 * User: Nino
 * Date: 6-12-2017
 * Time: 18:04
 */

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