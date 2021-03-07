import React, { useState } from "react";

import { askForBooking } from "../../../http/api";
import { Itinerary } from "./Itinerary";

export const ResponseFlight = (props) => {
  const {
    itineraries,
    originLocationCode,
    destinationLocationCode,
    price,
    logged,
    id,
    dispatch,
  } = props;
  const [, setErrorMessage] = useState("");

  const handleBooking = () => {
    const makeBook = askForBooking(dispatch, props, setErrorMessage);
    makeBook();
  };
  return (
    <li className="Flight radius animate__animated animate__flipInX">
      <Itinerary
        itinerary={itineraries[0]}
        originLocationCode={originLocationCode}
        destinationLocationCode={destinationLocationCode}
      />
      {itineraries[1] && (
        <Itinerary
          itinerary={itineraries[1]}
          originLocationCode={originLocationCode}
          destinationLocationCode={destinationLocationCode}
        />
      )}
      <ul className="Itinerary__offer-price">
        <li>Nº:{id}</li>
        <li>{price.total}€</li>
        {logged && (
          <li>
            <div
              className="Itinerary__booking-trigger"
              onClick={() => {
                handleBooking(id);
              }}
            ></div>
          </li>
        )}
      </ul>
    </li>
  );
};
