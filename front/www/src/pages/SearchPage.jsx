import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../components/SearchForm/searchForm.css';
import { useAuthContext } from '../context/Auth.context';
import { useFlightContext } from '../context/flight/Flight.context';
import { SearchForm } from '../components/SearchForm/SearchForm';

const ResponseHeader = ({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults,
  setOrder,
}) => {
  return (
    <div className="Response-header" style={{ marginTop: '1rem' }}>
      <ul className="Response__airports">
        <li>{originLocationCode}</li>
        <li className="roundTrip-icon"></li> {/* //? PUTO CSS? DE DONDE SALE ESTE ICONO? */}
        <li>{destinationLocationCode}</li>
        <li className="pencil-icon"></li>
      </ul>
      <ul className="Response__filters">
        <li className="Response-filter__stops filter active sort">P</li>
        <li className="Response-filter__duration filter">
          <button onClick={() => setOrder('duration')}>ord</button>
        </li>
        <li className="Response-filter__price filter active reverse">$</li>
      </ul>
      <ul className="Response__dates">
        <li>{departureDate}</li>
        {returnDate && <li>{returnDate}</li>}
        <li>{adults} px</li>
      </ul>
    </div>
  );
};
export const SearchPage = () => {
  const [order, setOrder] = useState('');

  const [
    {
      oneWay,
      adults,
      nonStop,
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      searching,
      max,
      maxPrice,
      response,
    },
    dispatch,
  ] = useFlightContext();
  const [{ logged }] = useAuthContext([]);

  useEffect(() => {}, [order]);
  return (
    <>
      {!searching && (
        <SearchForm
          oneWay={oneWay}
          adults={adults}
          nonStop={nonStop}
          originLocationCode={originLocationCode}
          destinationLocationCode={destinationLocationCode}
          departureDate={departureDate}
          returnDate={returnDate}
          searching={searching}
          dispatch={dispatch}
          max={max}
          maxPrice={maxPrice}
        />
      )}
      {searching && (
        <ResponseHeader
          originLocationCode={originLocationCode}
          destinationLocationCode={destinationLocationCode}
          departureDate={departureDate}
          returnDate={returnDate}
          adults={adults}
          setOrder={setOrder}
        />
      )}

      <ul className="Response-list">
        {response?.data?.map((element) => {
          console.log(element);
          return (
            <li key={element.id} className="Flight">
              <ul className="itinerary">
                <li className="company">{element.validatingAirlineCodes[0]}</li>
                <li className="times">
                  <p>{element.itineraries[0].segments[0].departure.at}</p>
                  <div className="stops1">{element.itineraries[0].segments.length - 1}</div>
                  <p>{element.itineraries[0].segments[element.itineraries[0].segments.length - 1].departure.at}</p>
                </li>
                <li className="ports">
                  <p>{originLocationCode}</p>
                  <div>{element.itineraries[0].duration}</div>
                  <p>{destinationLocationCode}</p>
                </li>
              </ul>
              <ul className="itinerary">
                <li className="company">{element.validatingAirlineCodes[0]}</li>
                <li className="times">
                  <p>{element.itineraries[1].segments[0].departure.at}</p>
                  <div className="stops1">{element.itineraries[1].segments.length - 1}</div>
                  <p>{element.itineraries[1].segments[element.itineraries[0].segments.length - 1].departure.at}</p>
                </li>
                <li className="ports">
                  <p>{destinationLocationCode}</p>
                  <div>{element.itineraries[1].duration}</div>
                  <p>{originLocationCode}</p>
                </li>
              </ul>

              <ul className="offer">
                <li>{element.price.total}€</li>
                {logged && (
                  <li>
                    <div
                      className="heart"
                      onClick={() => {
                        console.log('reservar!');
                      }}
                    ></div>
                  </li>
                )}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};
