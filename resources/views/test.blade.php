@extends('layouts.socketio_master')

@section('content')
    <div id="counter">0</div>
    <button id="start">Start...</button>
    <button id="reset">Reset!</button>
@stop

@section('footer')
    <script src="{{ mix('/js/chartapp.js') }}"></script>
    <script>var app_ip = '{{ env("MIX_APP_IP") }}';</script>

    <script src="{{ mix('/js/client.js') }}"></script>
@stop