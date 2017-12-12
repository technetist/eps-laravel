<?php
namespace App\Events;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\DB;

class SocketMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $status;
    public function __construct()
    {
        $activeMachines = DB::table('stats')->get();
        foreach ($activeMachines as $activeMachine) {
            $machine = $activeMachine->machine;
            $state = $activeMachine->status;
            if ($machine == 'machine1') {
                switch ($state) {
                    case 'active':
                        $status1 = 2;
                        break;
                    case 'non-active':
                        $status1 = 0;
                        break;
                    case 'idle':
                        $status1 = 1;
                }
            }
            if ($machine == 'machine2') {
                switch ($state) {
                    case 'active':
                        $status2 = 2;
                        break;
                    case 'non-active':
                        $status2 = 0;
                        break;
                    case 'idle':
                        $status2 = 1;
                }
            }
            if ($machine == 'machine3') {
                switch ($state) {
                    case 'active':
                        $status3 = 2;
                        break;
                    case 'non-active':
                        $status3 = 0;
                        break;
                    case 'idle':
                        $status3 = 1;
                }
            }
            if ($machine == 'machine4') {
                switch ($state) {
                    case 'active':
                        $status4 = 2;
                        break;
                    case 'non-active':
                        $status4 = 0;
                        break;
                    case 'idle':
                        $status4 = 1;
                }
            }
            if ($machine == 'machine5') {
                switch ($state) {
                    case 'active':
                        $status5 = 2;
                        break;
                    case 'non-active':
                        $status5 = 0;
                        break;
                    case 'idle':
                        $status5 = 1;
                }
            }
        }
        $status=array('number1' => $status1,'number2' => $status2,'number3' => $status3,'number4' => $status4,'number5' => $status5);

        $this->status = $status;
    }
    public function broadcastOn()
    {
        return ['ppc-game-communication-broadcast'];
    }
    /**
     * Get the broadcast event name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'messages.getStatus';
    }
}