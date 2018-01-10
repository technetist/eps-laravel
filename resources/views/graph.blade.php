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
            <a href="{{route('change_parameters')}}"><input role="button" id="change_par" class="btn btn-sm" type="submit" value="Change parameters"></a>
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
                <div id="app">
                    <trend
                            :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                            :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                            auto-draw
                            smooth>
                    </trend>
                </div>
            </div>
        </div>

        <div class="col-lg-5">
            <h3 style="text-align: center">Service level</h3>

            <div id="app2">

            </div>
        </div>
    </div>

    <div class="modal fade" id="Modal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">Initial inventory</h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div id="textfields" class="col-lg-11">
                            <div class="row">
                                <label>A0:</label>
                                <p type="number" name="inventory" id="A0" >
                            </div>
                            <div class="row">
                                <label>B0:</label>
                                <p type="number" name="inventory" id="B0" >
                            </div>
                            <div class="row">
                                <label>C0:</label>
                                <p type="number" name="inventory" id="C0" >
                            </div>
                            <div class="row">
                                <label>D0:</label>
                                <p type="number" name="inventory" id="D0" >
                            </div>
                            <div class="row">
                                <label>D1:</label>
                                <p type="number" name="inventory" id="D1" >
                            </div>
                            <div class="row">
                                <label>E0:</label>
                                <p type="number" name="inventory" id="E0" >
                            </div>
                            <div class="row">
                                <label>E1:</label>
                                <p type="number" name="inventory" id="E1" >
                            </div>
                            <div class="row">
                                <label>E2:</label>
                                <p type="number" name="inventory" id="E2" >
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="modal1_savechanges">Save changes</button>
                    <button type="button" class="btn btn-secondary" id="modal1_close" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="Modal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">Ready??</h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-11">
                            <div class="row">
                                Please hand out the inventory:
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="modal2_ok">Ok</button>
                    <button type="button" class="btn btn-primary" id="modal2_cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>


@endsection

@section('footer')
    <div id="footer" class="row">
        <p id="copyright">Copyright ©2017 Fh St.P&ouml;lten All Rights Reserved.</p>
    </div>

    <script src=//unpkg.com/vue></script>
    <script src=//unpkg.com/vuetrend></script>
    <script>var app_ip = '{{ env("MIX_APP_IP") }}'</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="{{ mix('/js/chartapp.js') }}" type="text/javascript"></script>
    <script src="{{ mix('/js/vueclient.js') }}" type="text/javascript"></script>


@endsection