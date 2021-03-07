import React from "react";

import { emptyBookingCache } from "../../../context/flight/Flight.actions";
import { useFlightContext } from "../../../context/flight/Flight.context";

export const BookingFooter = ({
  RC_base,
  RC_total,
  RC_adults,
  i1,
  i2 = "",
}) => {
  const [, dispatch] = useFlightContext();
  return (
    <>
      <section className="modal-booking-aditional-data">
        <div>
          <h5>PLAZAS</h5>
          <h4>{RC_adults}</h4>
        </div>
        <div>
          <h5>ESCALAS</h5>
          <h4>
            I: {i1.length - 1}
            {i2.length !== 0 ? `/ V: ${i2.length - 1}` : ""}
          </h4>
        </div>
        <div>
          <h5>PRECIO BASE</h5>
          <h4>{`${RC_base}€`}</h4>
        </div>
      </section>
      <footer className="modal-booking-footer">
        <div>
          <h5>PRECIO FINAL</h5>
          <h4>{`${RC_total}€`}</h4>
        </div>
        <button
          className="button-close"
          onClick={(e) => {
            e.preventDefault();
            dispatch(emptyBookingCache());
          }}
        >
          Cerrar
        </button>
      </footer>
    </>
  );
};
