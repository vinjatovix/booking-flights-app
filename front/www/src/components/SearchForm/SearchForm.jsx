import React, { useEffect } from 'react';
import { Article } from '../common/Article';
import * as A from '../../context/flight/Flight.actions';

export const SearchForm = ({
  oneWay,
  adults,
  nonStop,
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  searching,
  dispatch,
  max,
  maxPrice,
}) => {
  const makeQueryUrl = (
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    max,
    maxPrice
  ) => {
    console.log('====================================');
    console.log(returnDate);
    console.log('====================================');
    if (returnDate === '' || returnDate?.length === 0) {
      return `?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&max=${max}&maxPrice=${maxPrice}`;
    }
    return `?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&max=${max}&maxPrice=${maxPrice}`;
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    console.log(oneWay);
    dispatch(A.switchBoolean({ name: 'searching', value: searching }));

    if (oneWay) {
      dispatch(A.setString({ name: 'returnDate', value: '' }));
    }

    const query = makeQueryUrl(
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      max,
      maxPrice
    );

    const url = `http://localhost:8337/search/flights${query}`;

    const res = await fetch(url, {
      method: 'GET',
    });
    const data = await res.json();
    dispatch(A.saveResponse(data));
  };
  useEffect(() => {}, [searching]);
  return (
    <Article title="Buscador" className="">
      <form className="SearchForm" method="GET" encType="multipart/form-data" onSubmit={handlerSubmit}>
        <input
          type="button"
          name="trip"
          id="trip"
          value={oneWay ? 'Solo ida' : 'Ida y Vuelta'}
          onClick={() => dispatch(A.switchBoolean({ name: 'oneWay', value: oneWay }))}
        />
        <input
          type="number"
          name="passengers"
          id="passengers"
          placeholder="1"
          onChange={(e) => dispatch(A.setNumber({ name: 'adults', value: e.target.value }))}
          value={adults}
        />
        <input
          type="button"
          name="escales"
          id="escales"
          value={nonStop ? 'Sin escalas' : 'Todos'}
          onClick={(e) => dispatch(A.switchBoolean({ name: 'nonStop', value: nonStop }))}
        />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Precio Tope"
          onChange={(e) => dispatch(A.setNumber({ name: 'maxPrice', value: e.target.value }))}
        />
        <fieldset className="origin">
          <input
            type="text"
            name="origin"
            id="origin"
            placeholder="SCQ - Lavacolla"
            onChange={(e) =>
              dispatch(
                A.setString({
                  name: 'originLocationCode',
                  value: e.target.value,
                })
              )
            }
          />
        </fieldset>
        <fieldset className="destination">
          <input
            type="text"
            name="destination"
            id="destination"
            placeholder="FCO - Fiumiccino"
            onChange={(e) =>
              dispatch(
                A.setString({
                  name: 'destinationLocationCode',
                  value: e.target.value,
                })
              )
            }
          />
        </fieldset>
        <fieldset className="date">
          <input
            type="date"
            name="departureDate"
            id="departureDate"
            onChange={(e) => dispatch(A.setString({ name: 'departureDate', value: e.target.value }))}
          />
          {!oneWay && (
            <input
              type="date"
              name="returnDate"
              id="returnDate"
              onChange={(e) => dispatch(A.setString({ name: 'returnDate', value: e.target.value }))}
            />
          )}
        </fieldset>
        <input type="submit" value="Buscar" />
      </form>
    </Article>
  );
};
