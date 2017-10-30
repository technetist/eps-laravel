<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    public function pusher()
    {
        $message = 'hello world';
        broadcast(new MessageSent($message))->toOthers();

        return ['status' => 'Message Sent!'];
    }
}
