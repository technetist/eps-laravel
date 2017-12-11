<?php
/**
 * Created by PhpStorm.
 * User: Nino
 * Date: 11-12-2017
 * Time: 11:30
 */

namespace App\Http\Controllers;


class SessionController
{
    public function destroy($id)
    {
        $session = DB::table('sessions')->where('id', $id);
        $session->delete();

        alert()->success('Session erased');

        return back();
    }
}