@extends("layouts.vue")

@section('content')

        <div class="row col-lg-12 ng-scope">
        <div class="col-lg-10">

            The cut and painted parts from workstation 1 and workstation 2 (B0) must be painted according to the figure above. Afterwards, these pieces are transformed to product C0.

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
                <li>4. Execute the individual work step to produce the right final product.</li>
                <li>5. Check out.</li>
                <li>6. Put the products to the inventory in front of the next machine (no capacity limit).</li>
                <li>Equipment: Two containers. One for production, and one container as storage before the workstation.</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>KANBAN</h3>
            <ul>
                <li>1. The next workstation takes the products A0 and withdraws a Kanban container.</li>
                <li>2. If the submaterials (B0) are available in the inventory start production.</li>
                <li>3. Check in..</li>
                <li>4. Execute the individual work step.</li>
                <li>5. Check out.</li>
                <li>6. Fill the Kanban container with the produced products an put the container in front of the next workstation (Attention to the Kanban lotsize).</li>
                <li>Equipment: Default setting is a Kanban container to work and store the products. The products are taken from the next workstation.</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>CONWIP</h3>
            <ul>
                <li>1. As soon as a labelled container from the previous container arrives start production.</li>
                <li>2. Check in.</li>
                <li>3. Execute the individual work step to produce the right final product</li>
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