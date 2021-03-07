import React from "react";

import { Itinerary } from "./Itinerary";
import { BookingHeader } from "./BookingHeader";
import { BookingFooter } from "./BookingFooter";

import { useFlightContext } from "../../../context/flight/Flight.context";

import "./booking.css";

export const Booking = () => {
  const [{ bookingCache }] = useFlightContext();
  const { header, details } = bookingCache;
  const ida = details.ida;
  const vuelta = details?.vuelta ? details.vuelta : null;
  const { RC_ID, RC_adults, RC_base, RC_total } = header;
  return (
    <>
      <BookingHeader RC_ID={RC_ID} itinerary={ida} />
      <main className="modal-booking-main">
        <Itinerary header={header} itinerary={ida} />
        {vuelta.length !== 0 && (
          <Itinerary header={header} itinerary={vuelta} />
        )}
      </main>
      <BookingFooter
        RC_adults={RC_adults}
        RC_total={RC_total}
        RC_base={RC_base}
        i1={ida}
        i2={vuelta}
      />
    </>
  );
};
