<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
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
<div id="footer" class="row">
    <p id="copyright">Copyright ©2017 Fh St.Pölten All Rights Reserved.</p>
</div>
</body>
</html>