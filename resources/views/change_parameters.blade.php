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
                <td><input type="number" id="safetystock_A0" name="safetystock_A0" value="0"/></td>
                <td><input type="number" id="lotsize_A0" name="lotsize_A0" value="8"/></td>
                <td><input type="number" id="leadtime_A0" name="leadtime_A0" value="120"/></td>
            </tr>

            <tr>
                <td>B0</td>
                <td><input type="number" id="safetystock_B0" name="safetystock_B0" value="0"/></td>
                <td><input type="number" id="lotsize_B0" name="lotsize_B0" value="8"/></td>
                <td><input type="number" id="leadtime_B0" name="leadtime_B0" value="120"/></td>
            </tr>

            <tr>
                <td>C0</td>
                <td><input type="number" id="safetystock_C0" name="safetystock_C0" value="0"/></td>
                <td><input type="number" id="lotsize_C0" name="lotsize_C0" value="8"/></td>
                <td><input type="number" id="leadtime_C0" name="leadtime_C0" value="120"/></td>
            </tr>

            <tr>
                <td>D0</td>
                <td><input type="number" id="safetystock_D0" name="safetystock_D0" value="0"/></td>
                <td><input type="number" id="lotsize_D0" name="lotsize_D0" value="8"/></td>
                <td><input type="number" id="leadtime_D0" name="leadtime_D0" value="120"/></td>
            </tr>

            <tr>
                <td>D1</td>
                <td><input type="number" id="safetystock_D1" name="safetystock_D1" value="0"/></td>
                <td><input type="number" id="lotsize_D1" name="lotsize_D1" value="8"/></td>
                <td><input type="number" id="leadtime_D1" name="leadtime_D1" value="120"/></td>
            </tr>

            <tr>
                <td>E0</td>
                <td><input type="number" id="safetystock_E0" name="safetystock_E0" value="0"/></td>
                <td><input type="number" id="lotsize_E0" name="lotsize_E0" value="8"/></td>
                <td><input type="number" id="leadtime_E0" name="leadtime_E0" value="120"/></td>
            </tr>

            <tr>
                <td>E1</td>
                <td><input type="number" id="safetystock_E1" name="safetystock_E1" value="0"/></td>
                <td><input type="number" id="lotsize_E1" name="lotsize_E1" value="8"/></td>
                <td><input type="number" id="leadtime_E1" name="leadtime_E1" value="120"/></td>
            </tr>

            <tr>
                <td>E2</td>
                <td><input type="number" id="safetystock_E2" name="safetystock_E2" value="0"/></td>
                <td><input type="number" id="lotsize_E2" name="lotsize_E2" value="8"/></td>
                <td><input type="number" id="leadtime_E2" name="leadtime_E2" value="120"/></td>
            </tr>
        </tbody>
        </table>
    </div>
    {{ Form::close() }}
</div>
</div>
@endsection