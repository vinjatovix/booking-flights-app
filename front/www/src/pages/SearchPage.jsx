import React, { useEffect, useState } from 'react';
import '../components/SearchForm/searchForm.css';
import { useAuthContext } from '../context/Auth.context';
import { useFlightContext } from '../context/flight/Flight.context';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { ResponseFlight } from '../components/SearchForm/ResponseFlight';
import { monthName } from '../utils/dateUtils';

const ResponseHeader = ({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults,
  setOrder,
}) => {
  const dd = new Date(departureDate);
  const salida = `${dd.getDate()}${monthName(dd.getMonth())}`;
  const rd = new Date(returnDate);
  const llegada = `${rd.getDate()}${monthName(rd.getMonth())}`;
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
        <li>{salida}</li>
        {llegada && <li>{llegada}</li>}
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
        {response?.data?.map((element) => (
          <ResponseFlight key={element.id} auth={logged} {...element} />
        ))}
      </ul>
    </>
  );
};
