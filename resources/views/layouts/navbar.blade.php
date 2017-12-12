<div class="navbar navbar-default navbar-static-top">
    <div class="container">
        <a class="navbar-brand" href="{{ route('homepage') }}">
            <img class="logo" src=" {{ asset('/images/logo100x100.png') }}">
        </a>
        <button class="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <nav class="collapse navbar-collapse">

            <ul class="nav navbar-nav navbar-left">
                <li><a href="{{ route('play_game') }}">
                        Play game
                    </a>
                </li>
                <li>
                    <a href="{{ route('analyse') }}">
                        Analyse
                    </a>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                         Instructions
                    <b class="caret"></b></a>

                        <ul class="dropdown-menu">
                            <li>sdfsad</li>
                            {{--<a href="{{ route('graph') }}">--}}
                                {{--Graph--}}
                            {{--</a>--}}
                            <li><a href="#">dsfafda</a></li>

                        </ul>
                </li>

                <li>
                    <a href="{{ route('graph') }}">
                    Graph
                    </a>
                </li>

                <li>
                    <a href="{{ route('contact') }}">
                         Contact
                    </a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <span class="navbar-text">Welcome, (name of user)</span>
                </li>
                <li>
                    <a href="#" data-toggle="modal" data-target="#help">
                        <span class="text-primary">Help</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>
