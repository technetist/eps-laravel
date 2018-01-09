@extends("layouts.vue")

@section('content')

    <div class="row">
        <div id="filter" style="margin-left: 5%" class="col-lg-4">
            <form method="GET">
                <input type="text" name="name">
                <button class="btn btn-primary filter-lp" type="submit">Search</button>
            </form>
        </div>
    </div><br/>

    <div class="col-lg-12">
        <div class="table-responsive">
            <table class="table table-responsive">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th colspan="5">Utilisation</th>
                    <th colspan="6">Time/piece</th>
                </tr>
                <tr>
                    <th>Session name</th>
                    <th>Servicelevel</th>
                    <th>Leadtime</th>
                    <th>Inventory</th>
                    <th>WIP</th>
                    <th>FGI</th>
                    <th>1: cutting</th>
                    <th>2: Surface Treatment</th>
                    <th>3: Painting	</th>
                    <th>4: Customization</th>
                    <th>5: finishing</th>
                    <th>1: cutting</th>
                    <th>2: Surface Treatment</th>
                    <th>3: Painting	</th>
                    <th>4: Customization</th>
                    <th>5: finishing</th>
                    <th>average</th>

                    <th></th>
                </tr>
                </thead>
                <tbody>
                @foreach($sessions as $session)
                    <tr>
                        <td>{{ $session->sessionName }}</td>
                        <td>{{ $session->serviceLevel }}</td>
                        <td>{{ $session->leadtime }}</td>
                        @foreach($inventories as $inventory)
                            @if($inventory->id == $session->id)

                                <td>{{ $inventory->A0 + $inventory->B0 + $inventory->C0 + $inventory->D0
                                   + $inventory->D1 + $inventory->E0 + $inventory->E1 + $inventory->E2}}</td>

                            @else
                                <td></td>
                            @endif
                        @endforeach

                        <td>{{ $session->averageWip }}</td>
                        <td>{{ $session->averageFgi }}</td>
                        <td>{{ $session->utilisation_M1 }}</td>
                        <td>{{ $session->utilisation_M2 }}</td>
                        <td>{{ $session->utilisation_M3 }}</td>
                        <td>{{ $session->utilisation_M4 }}</td>
                        <td>{{ $session->utilisation_M5 }}</td>
                        <td>{{ $session->timePerPiece_M1 }}</td>
                        <td>{{ $session->timePerPiece_M2 }}</td>
                        <td>{{ $session->timePerPiece_M3 }}</td>
                        <td>{{ $session->timePerPiece_M4 }}</td>
                        <td>{{ $session->timePerPiece_M5 }}</td>
                        <td>{{ $session->timePerPiece }}</td>



                        <td class="table-action">
                            <form class="table-action" method="post" action="{{ route('sessions.destroy', $session->id) }}">
                                {{ csrf_field() }}
                                {{ method_field('DELETE') }}
                                <input role="button" class="btn btn-sm btn-danger table-action" type="submit" value="Delete">
                            </form>
                        </td>
                    </tr>
                @endforeach
                </tbody>

            </table>
        </div>
    </div>



@endsection

@section('footer')
    <div id="footer" class="row">
        <p id="copyright">Copyright ©2017 Fh St.P&ouml;lten All Rights Reserved.</p>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>


@endsection