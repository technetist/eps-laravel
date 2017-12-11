@extends("layouts.vue")

@section('content')
    <div class="row">
        <div class="col-lg-12">
            <label>MRP</label>
            <input type="radio">

            <label>KANBAN</label>
            <input type="radio">

            <label>CONWIP</label>
            <input type="radio">
            <hr>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-5">
        <h3 style="text-align: center">Inventory</h3>

            <div id="app1">

            </div>
        </div>

        <div class="col-lg-5">
            <h3 style="text-align: center">Service level</h3>

            <div id="app2">

            </div>
        </div>
    </div>


@endsection

@section('footer')
    <div id="footer" class="row">
        <p id="copyright">Copyright ©2017 Fh St.P&ouml;lten All Rights Reserved.</p>
    </div>
    <script src="{{ mix('/js/chartapp.js') }}" type="text/javascript"></script>
@endsection