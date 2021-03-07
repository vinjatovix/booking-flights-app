import React from "react";
import { timeTrigger } from "../../../utils/dateUtils";

export const Itinerary = ({
  itinerary,
  originLocationCode,
  destinationLocationCode,
}) => {
  const fechaSalida = new Date(itinerary.segments[0].departure.at);
  const fechaLlegada = new Date(
    itinerary.segments[itinerary.segments.length - 1].arrival.at
  );

  return (
    <>
      <ul className="Itinerary">
        <li>{itinerary.segments[0].carrierCode}</li>
        <li>
          <p>{timeTrigger(fechaSalida)}</p>
          <div className={`stops${itinerary.segments.length - 1}`}></div>
          <p>{timeTrigger(fechaLlegada)}</p>
        </li>
        <li className="Itinerary__airports">
          <p>{originLocationCode}</p>
          <div>{itinerary.duration.replace("PT", "").toLowerCase()}</div>
          <p>{destinationLocationCode}</p>
        </li>
      </ul>
    </>
  );
};
