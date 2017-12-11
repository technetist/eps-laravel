@extends("layouts.vue")

@section('content')
    <div class="row col-lg-12 ng-scope">
        <div class="col-lg-10">

            Take the raw material (paper) and produce the requested number of pieces. Conducting this working step material A0 is produced.

        </div>
    </div>
    <div class="row col-lg-12 ng-scope">
        <div class="col-lg-1"></div>
        <div class="col-lg-3">
            <h3>MRP</h3>
            <ul>
                <li>1. An order appears on the screen.</li>
                <li>2. Check in.</li>
                <li>3. Take the raw material (paper).</li>
                <li>4. Cut products according to the order amount.</li>
                <li>5. Check out.</li>
                <li>6. Put the products to the inventory in front of the next machine (no capacity limit).</li>
                <li>Equipment: One container to produce.</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>KANBAN</h3>
            <ul>
                <li>1. The next workstation takes the products A0 and withdraws a Kanban container.</li>
                <li>2. Check in.</li>
                <li>3. Take the raw material.</li>
                <li>4. Cut products according to the order amount.</li>
                <li>5. Check out.</li>
                <li>6. Fill the Kanban container with the produced products.</li>
                <li>Equipment: Default setting is the number of Kanban containers according to the defined Kanbans per product to work and store the products. The Kanban container are withdrawn from the next workstation.</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>CONWIP</h3>
            <ul>
                <li>1. The requested final product will appear in the screen.</li>
                <li>2. Take the labelled container.</li>
                <li>3. Check in.</li>
                <li>4. Take the raw material.</li>
                <li>5. Cut products according to the order amount.</li>
                <li>6. Check out.</li>
                <li>7. Put the container together with the pieces to the next workstation.</li>
                <li>8. Check the screen of the website for the next order.</li>
                <li>Equipment: The container with the customer order information is taken after production from the workstation to the next workstation.</li>
            </ul>
        </div>
    </div>
@endsection

@section('footer')
    <div id="footer" class="row">
        <p id="copyright">Copyright ©2017 Fh St.P&ouml;lten All Rights Reserved.</p>
    </div>
@endsection