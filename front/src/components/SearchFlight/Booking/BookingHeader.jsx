import React from "react";

export const BookingHeader = ({ RC_ID, itinerary }) => {
  return (
    <>
      <header className="modal-booking-header">
        <section className="booking-header-1">
          <h1>FL</h1>
          <small>0.6</small>
        </section>
        <section className="booking-header-2">
          <h5>{`ID: ${RC_ID}`}</h5>
        </section>
      </header>
      <section className="booking-towns">
        <div className="booking-towns-1">
          <h4>{itinerary[0].Vue_origenLoca}</h4>
        </div>
        <div className="booking-towns-2">
          <h4>{itinerary[itinerary.length - 1].Vue_destinoLoca}</h4>
        </div>
      </section>
    </>
  );
};
