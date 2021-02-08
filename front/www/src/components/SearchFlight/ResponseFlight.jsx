import React from 'react';
import { monthName } from '../../utils/dateUtils';

const Itinerary = ({ itinerary, originLocationCode, destinationLocationCode }) => {
  const fechaSalida = new Date(itinerary.segments[0].departure.at);
  const fechaLlegada = new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at);

  const timeTrigger = (date) => {
    const minutes = date.getMinutes().toString();
    return `${date.getDate()}/${monthName(date.getMonth())} ${date.getHours()}:${minutes.padStart(2, '0')}`;
  };
  return (
    <>
      <ul className="itinerary">
        <li>{itinerary.segments[0].carrierCode}</li>
        <li className="company"></li>
        <li className="times">
          <p>{timeTrigger(fechaSalida)}</p>
          <div className={`stops${itinerary.segments.length - 1}`}></div>
          <p>{timeTrigger(fechaLlegada)}</p>
        </li>
        <li className="ports">
          <p>{originLocationCode}</p>
          <div>{itinerary.duration.replace('PT', '').toLowerCase()}</div>
          <p>{destinationLocationCode}</p>
        </li>
      </ul>
    </>
  );
};

export const ResponseFlight = (props) => {
  const { itineraries, originLocationCode, destinationLocationCode, price, auth, id } = props;
  return (
    <li className="Flight">
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
      <ul className="offer">
        <li>{price.total}€</li>
        {auth && (
          <li>
            <div
              className="heart"
              onClick={() => {
                console.log(id);
              }}
            ></div>
          </li>
        )}
      </ul>
    </li>
  );
};
