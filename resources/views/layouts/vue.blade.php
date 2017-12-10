<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Vue page</title>

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/vue.css')  }}" rel="stylesheet">

</head>
<body>
@include('layouts.navbar');
<br/>
<div class="row">
    @yield('content');
</div>
<br/>
@yield('footer');
</body>
</html>