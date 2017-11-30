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
        <div class="collapse navbar-collapse navHeaderCollapse">

            <ul class="nav navbar-nav navbar-left">
                <li><a href="">
                        <i class="fa fa-dashboard"></i>  Play game
                    </a>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" >
                        <i class="fa fa-file-text"></i> Analyse
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="fa fa-puzzle-piece"></i>  Instructions
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="fa fa-users"></i>  Contact
                    </a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <span class="navbar-text">Welcome, (name of user)</span>
                </li>
                <li>
                    <a href="#" data-toggle="modal" data-target="#help">
                        <span class="text-primary"><i class="fa fa-question"></i> Help</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
