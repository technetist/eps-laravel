<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;

class ApiController extends Controller
{
    public function pusherAuth()
    {
        $user = auth()->user();

        if ($user) {
            $pusher = new Pusher(config('broadcasting.connections.pusher.key'), config('broadcasting.connections.pusher.secret'), config('broadcasting.connections.pusher.app_id'));
            echo $pusher->socket_auth($_POST[request()->channel_name], $_POST[request()->socket_id]);
            return;
        }else {
            header('', true, 403);
            echo "Forbidden";
            return;
        }
    }
}
