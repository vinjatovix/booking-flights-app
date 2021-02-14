import React, { useState } from 'react';
import { useAuthContext } from '../../context/Auth.context';
import { fetchBender, makeBooking } from '../../http/api';
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
  const { itineraries, originLocationCode, destinationLocationCode, price, logged, id } = props;
  const [errorMessage, setErrorMessage] = useState('');

  const handleBooking = () => {
    const token = localStorage.getItem('token');
    // makeBooking(props, { token: token, errorMessage, setErrorMessage });
    const makeBook = async () => {
      const res = await fetchBender(`http://localhost:8337/book/flight`, {
        token: JSON.parse(token),
        method: 'POST',
        body: { ...props },
      });
      console.log(res);
    };
    makeBook();
  };
  return (
    <li className="Flight radius">
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
        {logged && (
          <li>
            <div
              className="heart"
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
