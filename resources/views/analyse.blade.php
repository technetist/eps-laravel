@extends("layouts.vue")

@section('content')
    <div class="col-lg-12">
        <div class="table-responsive">
            <table class="table table-responsive">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th colspan="4">Utilisation</th>
                    <th colspan="4">Time/piece</th>
                </tr>
                <tr>
                    <th>Session name</th>
                    <th>Inventory</th>
                    <th>WIP</th>
                    <th>FGI</th>
                    <th>5: finishing</th>
                    <th>4: Customization</th>
                    <th>3: Painting	</th>
                    <th>2: Surface Treatment</th>
                    <th>5: finishing</th>
                    <th>4: Customization</th>
                    <th>3: Painting	</th>
                    <th>2: Surface Treatment</th>
                    <th>Servicelevel</th>
                    <th>Leadtime</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @foreach($sessions as $session)
                <tr>
                        <td>{{$session->sessionName}}</td>
                        @foreach($inventories as $inventory)
                            @if($inventory->id == $session->id)

                                <td>{{ $inventory->A0 + $inventory->B0 + $inventory->C0 + $inventory->D0
                                   + $inventory->D1 + $inventory->E0 + $inventory->E1 + $inventory->E2}}</td>
                            @endif
                        @endforeach
                        <td>{{ $session->averageWip }}</td>
                        <td>{{ $session->averageFgi }}</td>
                        <td>{{ $session->utilisation_M5 }}</td>
                        <td>{{ $session->utilisation_M4 }}</td>
                        <td>{{ $session->utilisation_M3 }}</td>
                        <td>{{ $session->utilisation_M2 }}</td>
                        <td>{{ $session->timePerPiece_M5 }}</td>
                        <td>{{ $session->timePerPiece_M4 }}</td>
                        <td>{{ $session->timePerPiece_M3 }}</td>
                        <td>{{ $session->timePerPiece_M2 }}</td>
                        <td>{{ $session->serviceLevel }}</td>
                        <td>{{ $session->leadtime }}</td>
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