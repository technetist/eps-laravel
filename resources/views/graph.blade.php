@extends("layouts.vue")

@section('content')
    <div class="row">
        <div id="buttons" class="col-lg-3">
            <label>MRP</label>
            <input type="radio" name="algorithm" id="mrp" >

            <label>KANBAN</label>
            <input type="radio" name="algorithm" id="kanban">

            <label>CONWIP</label>
            <input type="radio" name="algorithm" id="conwip">

        </div>

        <div class="col-lg-4">
            <input role="button" id="start" class="btn btn-sm" type="submit" value="Start session">
            <input role="button" id="stop" class="btn btn-sm" type="submit" value="Stop session">
            <input role="button" id="reset" class="btn btn-sm" type="submit" value="Reset">
            <input role="button" id="change_par" class="btn btn-sm" type="submit" value="Change parameters">
        </div>

        <div class="col-lg-1">
            <h2 id="counter"></h2>
        </div>
    </div>
    <hr>
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

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>


@endsection

@section('footer')
    <div id="footer" class="row">
        <p id="copyright">Copyright ©2017 Fh St.P&ouml;lten All Rights Reserved.</p>
    </div>
    <script>var app_ip = '{{ env("MIX_APP_IP") }}'</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="{{ mix('/js/chartapp.js') }}" type="text/javascript"></script>
    <script src="{{ mix('/js/vueclient.js') }}" type="text/javascript"></script>

@endsection