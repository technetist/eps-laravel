@extends("layouts.vue")

@section('content')

<div class="row">
<div class="col-lg-11">
    {{ Form::open(['route' => 'submit_change_parameters'], method_field('post'))}}
    

    <input type="submit" value="submit"/><br/><br/>
    <div class="table-responsive">
        <table class="table table-responsive">
        <thead>
            <tr>
                <th>Product</th>
                <th>Safety stock(pcs)</th>
                <th>Lot size(pcs)</th>
                <th>Lead time(sec)</th>
            </tr>

        </thead>
        <tbody>
            <tr>
                <td>A0</td>
                <td><input type="number" id="safetystock_A0" name="safetystock_A0" value="{{$last_session->MRPparameters_0}}"/></td>
                <td><input type="number" id="lotsize_A0" name="lotsize_A0" value="{{$last_session->MRPparameters_8}}"/></td>
                <td><input type="number" id="leadtime_A0" name="leadtime_A0" value="{{$last_session->MRPparameters_16}}"/></td>
            </tr>

            <tr>
                <td>B0</td>
                <td><input type="number" id="safetystock_B0" name="safetystock_B0" value="{{$last_session->MRPparameters_1}}"/></td>
                <td><input type="number" id="lotsize_B0" name="lotsize_B0" value="{{$last_session->MRPparameters_9}}"/></td>
                <td><input type="number" id="leadtime_B0" name="leadtime_B0" value="{{$last_session->MRPparameters_17}}"/></td>
            </tr>

            <tr>
                <td>C0</td>
                <td><input type="number" id="safetystock_C0" name="safetystock_C0" value="{{$last_session->MRPparameters_3}}"/></td>
                <td><input type="number" id="lotsize_C0" name="lotsize_C0" value="{{$last_session->MRPparameters_10}}"/></td>
                <td><input type="number" id="leadtime_C0" name="leadtime_C0" value="{{$last_session->MRPparameters_18}}"/></td>
            </tr>

            <tr>
                <td>D0</td>
                <td><input type="number" id="safetystock_D0" name="safetystock_D0" value="{{$last_session->MRPparameters_4}}"/></td>
                <td><input type="number" id="lotsize_D0" name="lotsize_D0" value="{{$last_session->MRPparameters_11}}"/></td>
                <td><input type="number" id="leadtime_D0" name="leadtime_D0" value="{{$last_session->MRPparameters_19}}"/></td>
            </tr>

            <tr>
                <td>D1</td>
                <td><input type="number" id="safetystock_D1" name="safetystock_D1" value="{{$last_session->MRPparameters_5}}"/></td>
                <td><input type="number" id="lotsize_D1" name="lotsize_D1" value="{{$last_session->MRPparameters_12}}"/></td>
                <td><input type="number" id="leadtime_D1" name="leadtime_D1" value="{{$last_session->MRPparameters_20}}"/></td>
            </tr>

            <tr>
                <td>E0</td>
                <td><input type="number" id="safetystock_E0" name="safetystock_E0" value="{{$last_session->MRPparameters_6}}"/></td>
                <td><input type="number" id="lotsize_E0" name="lotsize_E0" value="{{$last_session->MRPparameters_13}}"/></td>
                <td><input type="number" id="leadtime_E0" name="leadtime_E0" value="{{$last_session->MRPparameters_21}}"/></td>
            </tr>

            <tr>
                <td>E1</td>
                <td><input type="number" id="safetystock_E1" name="safetystock_E1" value="{{$last_session->MRPparameters_7}}"/></td>
                <td><input type="number" id="lotsize_E1" name="lotsize_E1" value="{{$last_session->MRPparameters_14}}"/></td>
                <td><input type="number" id="leadtime_E1" name="leadtime_E1" value="{{$last_session->MRPparameters_22}}"/></td>
            </tr>

            <tr>
                <td>E2</td>
                <td><input type="number" id="safetystock_E2" name="safetystock_E2" value="{{$last_session->MRPparameters_8}}"/></td>
                <td><input type="number" id="lotsize_E2" name="lotsize_E2" value="{{$last_session->MRPparameters_15}}"/></td>
                <td><input type="number" id="leadtime_E2" name="leadtime_E2" value="{{$last_session->MRPparameters_23}}"/></td>
            </tr>
        </tbody>
        </table>
    </div>
    {{ Form::close() }}
</div>
</div>
@endsection