@extends("layouts.vue")

@section('content')

        <div class="row col-lg-12 ng-scope">
        <div class="col-lg-10">

            The previously cut pieces (A0) are now painted with a marker as seen in the image above. Afterwards, the new product is called B0.

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
                <li>Equipment: Two containers. One for production, and one container as storage before the workstation.</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>KANBAN</h3>
            <ul>
                <li>1. The next workstation takes the products B0 and withdraws a Kanban container.</li>
                <li>2. If the submaterials (A0) are available in inventory start production.</li>
                <li>3. Check in.</li>
                <li>4. Execute the individual work step.</li>
                <li>5. Check out.</li>
                <li>6. Fill the Kanban container with the produced products an put the container in front of the next workstation (Attention to the Kanban lotsize).</li>
                <li>Equipment: Default setting are two Kanban container each used for production and storage. The next workstation withdraws the Kanban container.</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <h3>CONWIP</h3>
            <ul>
                <li>1. As soon as a labelled container from the previous container arrives, start production.</li>
                <li>2. Check in.</li>
                <li>3. Execute the individual work step to produce the right final product.</li>
                <li>4. Check out.</li>
                <li>5. Put the container together with the pieces to the next workstation.</li>
                <li>Equipment: None. The container with the customer order information is taken from the previous workstation and transported after production to the next workstation.</li>
            </ul>
        </div>
    </div>
@endsection

@section('footer')
    <div id="footer" class="row">
        <p id="copyright">Copyright ©2017 Fh St.P&ouml;lten All Rights Reserved.</p>
    </div>
@endsection