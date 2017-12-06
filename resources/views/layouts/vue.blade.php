<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue page</title>

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/vue.css')  }}" rel="stylesheet">
    <script src="http://d3js.org/d3.v3.min.js"></script>

    <style>
        #app {
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
            color: #2c3e50;
            margin-top: 60px;
        }
        .container {
            max-width: 800px;
            margin:  0 auto;
        }
    </style>

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