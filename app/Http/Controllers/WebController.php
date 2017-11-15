<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;

class WebController extends Controller
{
    public function pusherAuth()
    {
        $user = auth()->user();

        if ($user) {
            $pusher = new Pusher(env('PUSHER_APP_KEY'), env('PUSHER_APP_SECRET'), env('PUSHER_APP_ID'), array('cluster' => 'eu'));
            $pusher->trigger('my-channel', 'my-event', array('message' => 'hello world'));
            echo $pusher->socket_auth($_POST['my-channel'], $_POST['socket_id']);
            return;
        }else {
            header('', true, 403);
            echo "Forbidden";
            return;
        }
    }
}
