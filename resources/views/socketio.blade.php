@extends('layouts.socketio_master')

@section('content')
    <p id="power">0</p>
@stop

@section('footer')
    <script src="{{ mix('/js/app.js') }}"></script>
    <script src="{{ asset('js/socket.io.js') }}"></script>
    <script>

        var socket = io('http://192.168.10.10:3000');
        socket.on("test-channel:App\\Events\\SocketMessageEvent", function(message){

            $('#power').text(parseInt($('#power').text()) + parseInt(message.data.power));
        });
    </script>
@stop