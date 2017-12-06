@extends("layouts.vue")

@section('content')
    <div class="row">
        <div class="col-lg-5">
            <div id="app">
                <template>
                    <div id="app">
                        <div class="container">
                            <div class="Chart__list">
                                <div class="Chart">
                                    <h2>Linechart</h2>
                                    <line-example></line-example>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <script>
                    import LineExample from './components/LineChart.js'
                    export default {
                        name: 'app',
                        components: {
                            LineExample
                        }
                    }
                </script>
            </div>
        </div>
    </div>
@endsection