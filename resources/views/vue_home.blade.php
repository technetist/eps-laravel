@extends('layouts.vue')

@section('content')
<div class="row col-lg-12 ng-scope">
    <div class="col-lg-5">
        <h3 style="text-align: left;">Introduction and motivation</h3>
        In order to remain competitive in an international market, an enterprise must engage in a continuous improvement process. This is specially true in the field of production. The focus on research into production optimisation at the Steyr Campus of the Upper Austria University of Applied Sciences has taken up this issue and developed a related business game. This business game aims to structure production more efficiently - in particular production planning and control. The precise aim of this is to find ways of reducing stock, shortening lead time, optimising capacity utilisation and increasing delivery realiability - in other words the improvement of those factors that make a considerable contribution of the success or failure of an enterprise. These key metrics behave quite differently depending on the applied production planning and control system, such as for example, MRP, KANBAN and CONWIP. It is precisely these characteristics, advantages and disadvantages of the various PPC-systems, that the business game communicates most strikingly.

    </div>
    <div class="col-lg-5">
        <h3>Use and aims</h3>
        It is the aim of the project to enable players to understand, compare and scrutinise the various PPC-systems such as MRP, KANBAN, CONWIP by experiencing them in <a class="su" href="http://flock-1121.students.fhstp.ac.at/credits.html">t</a>he game. After the first rounds have been played and stores, all PPC systems parameters (lot size, planned lead time, number of KANBAN containers, maximum inventory level in the case of CONWIP, etc.) can be changed if desired by the players. After a round with the changed parameters, their effects on the key metrics can be precisely compared, analysed and discussed. Problems such as excessive levels, overly long or variable lead times and inadequate delivery reliability, which frequently occur in practice, can thus be grasped and understood. In a few hours, participants not only understand how the PPC-systems work and know their perspective which to get commonly occuring problems under control. This better understanding of production planning and control systems makes it easier for the stuff of an enterprise to implemment improvements in their own production planning.

    </div>
    <div class="col-lg-5">
        <h3>Structure and procedure</h3>
        One participant carries out an individual production step at each of five work stations. Three final products are finally available to the customer at the end of the production line. RFID-technology makes it possible for all data, key metrics and diagrams to be seen live on a screen by all participants at any time. At the end of each round the results are compared with those of all other rounds and discussed in the group.

    </div>
    <div class="col-lg-5">
        <h3>Offer</h3>
        We offer workshop for 6-12 participants with a duration of approximately 4-6 hours each. If required the content can be adapted to specific problems such as setup, lot size, etc. Prerequisits: medium-sized seminar room with video beamer. Price: quotations will be given on request.

    </div>
</div>

<br/><br/>

<h3 class="fw-special-title" style="text-align: center;">Where you can find us</h3>
<div class="" style="text-align: center;">If you wish to visit us directly, we can offer free counseling</div>

<div id="contact" class="row col-lg-11">
    <div class="col-lg-6">
        <iframe style="border: 0;" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10634.51102531523!2d15.62906308728027!3d48.21378551303923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x831d622b4ba9fc93!2sSaint+P%C3%B6lten+University+of+Applied+Sciences!5e0!3m2!1snl!2sat!4v1510008621249" width="600" height="450" frameborder="0" allowfullscreen="allowfullscreen">
        </iframe>
    </div>

    <div class="col-lg-5" style="margin-left: 0px">
        <img src="{{ asset('images/contact_photo.jpg') }}" />
        <h3 style="text-align: left;">FH St. Pölten</h3>
        <p style="text-align: left;">University of Applied Sciences</p>

        <div>Matthias Corvinus-Straße 15
            A-3100 St. Pölten</div>
        <ul>
            <li>T: <a href="tel:+43-2742-313-228-200">+43/2742/313 228-200</a></li>
            <li>F: <a href="tel:+43-2742-313-228-339">+43/2742/313 228-339</a></li>
            <li>E: support@fhstp.ac.at</li></ul>
    </div>
</div>
@endsection