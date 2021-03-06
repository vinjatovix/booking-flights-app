'use strict';

function headerDraw(RC_ID, ida) {
  return `        
  <header class="modal-booking-header">
    <section class="booking-header-1 radius">
        <h1>Flight Landers</h1>
        <small>0.6</small>
    </section>
    <section class="booking-header-2 radius">
        <h5>ID: ${RC_ID}</h5>
    </section>
    </header>
    <section class="booking-towns">
        <div class="booking-towns-1">
            <h4>${ida[0].Vue_origenLoca}</h4>
        </div>
        <div class="booking-towns-2">
            <h4>${ida[ida.length - 1].Vue_destinoLoca}</h4>
        </div>
    </section>`;
}
exports.headerDraw = headerDraw;
