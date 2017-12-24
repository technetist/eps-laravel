@extends("layouts.vue")

@section('content')
    <div class="row col-lg-12 ng-scope">
        <div class="col-lg-9">

            Take the pieces from the workstation 4 (D0 and D1) and paint them according to the figure above. Depending on the final product requirement, paint the piece with blue for E0, green for E1 or purple for E2.

        </div>
        <div class="col-lg-1"></div>
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
                <li>Equipment: 6 containers. 3 container to produce (E0, E1 or E2), and 3 representing the finished good inventory for products E0, E1 and E2 (no capacity limit).</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>KANBAN</h3>
            <ul>
                <li>1. The customer takes the final products E0, E1 and E2 and withdraws a Kanban container.</li>
                <li>2. If the submaterials E0 or E1 are available in inventory start production.</li>
                <li>3. Check in.</li>
                <li>4. Execute the individual work step.</li>
                <li>5. Check out.</li>
                <li>6. Fill the Kanban container with the produced products an put the container in the finished good inventory after workstation 5 (Attention to the Kanban lotsize)</li>
                <li>Equipment: Default settings are 3 Kanban containers to work and store the products in the finished good inventory. The customer takes the final products from there if they are available.</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>CONWIP</h3>
            <ul>
                <li>1. As soon as a labelled container from the previous container arrives, start production.</li>
                <li>2. Check in.</li>
                <li>3. Execute the individual work step to produce the right final product.</li>
                <li>4. Check out.</li>
                <li>5. Put the container to the finished good inventory after workstation 5.</li>
                <li>Equipment: None. The container with the customer order information is taken from the previous workstation and transported after production to the finished good inventory.</li>
            </ul>
        </div>
    </div>
@endsection

@section('footer')
    <div id="footer" class="row">
        <p id="copyright">Copyright ©2017 Fh St.P&ouml;lten All Rights Reserved.</p>
    </div>
@endsection