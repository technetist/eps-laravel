@extends('layouts.socketio_master')

@section('content')
    <p id="power">0</p>
@stop

@section('footer')
    <script src="{{ mix('/js/app.js') }}"></script>
    <script>var app_ip = '{{ env("MIX_APP_IP") }}';</script>

    <script src="{{ mix('/js/client.js') }}"></script>
@stop