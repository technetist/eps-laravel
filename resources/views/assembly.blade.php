@extends("layouts.vue")

@section('content')

    <div class="row col-lg-12 ng-scope">
        <div class="col-lg-9">

            Take the pieces from the workstation 3 (CO) and paint them with the colours as seen in the figure above. Depending on the product D0 or D1, paint the product yellow for D0 or blue for D1.

        </div>
    </div>
    <div class="row col-lg-12 ng-scope">
        <div class="col-lg-1"></div>
        <div class="col-lg-3">
            <h3>MRP</h3>
            <ul>
                <li>1. An order appears on the screen.</li>
                <li>2. The specific quantity of the submaterial is taken from the inventory in front of the workstation.</li>
                <li>3. Check in.</li>
                <li>4. Execute the individual work step.</li>
                <li>5. Check out.</li>
                <li>6. Put the products to the inventory in front of the next machine (no capacity limit).</li>
                <li>Equipment: 4 containers. 2 container to produce (D0 or D1), and 2 to store the produced products (D0 and D1; no capacity limit).</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>KANBAN</h3>
            <ul>
                <li>1. The next workstation takes the products D0 or D1 and withdraws a Kanban container.</li>
                <li>2. If the submaterials (C0) are available in the inventory start production.</li>
                <li>3. Check in.</li>
                <li>4. Execute the individual work step.</li>
                <li>5. Check out.</li>
                <li>6. Fill the Kanban container with the produced products D0 or D1 and put the container in front of the next workstation (Attention to the Kanban lotsize).</li>
                <li>Equipment: Default settings are 2 Kanban containers for products D0 and D1 respectively to produce and store the products. The next workstation withdraws the containers of D0 and D1.</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>CONWIP</h3>
            <ul>
                <li>1. As soon as a labelled container from the previous container arrives, start production.</li>
                <li>2. Check in.</li>
                <li>3. Execute the individual work step to produce the right final product.</li>
                <li>4. Check out.</li>
                <li>5. Send the container with the pieces to the next workstation.</li>
                <li>Equipment: None. The container with the customer order information is taken from the previous workstation and transported after production to the next workstation.</li>
            </ul>
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