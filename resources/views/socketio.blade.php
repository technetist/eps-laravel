@extends('layouts.socketio_master')

@section('content')
    <p id="power">0</p>
@stop

@section('footer')
    <script src="{{ mix('/js/app.js') }}"></script>

    <script src="{{ mix('/js/client.js') }}"></script>
@stop