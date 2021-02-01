import React, { useContext, useEffect, useState } from 'react';
import { Article } from '../common/Article';
import { AuthContext } from '../../context/Auth.context';
import './searchForm.css';
import { useAuthContext } from '../../context/Auth.context';

export const SearchForm = () => {
  const [auth] = useContext(AuthContext);
  const [order, setOrder] = useState('');

  const { flightData } = useAuthContext([]);

  useEffect(() => {
    //dispatch order action payload duration
  }, [order]);
  return (
    <>
      <Article title="Buscador" className="hide">
        <form
          className="SearchForm"
          method="POST"
          action="http://localhost:8337/search/flights"
          encType="multipart/form-data"
        >
          <fieldset>
            <select name="trip" id="trip">
              <option value="oneWay">Solo ida</option>
              <option value="roundTrip">Ida y Vuelta</option>
            </select>
            <input type="number" name="passengers" id="passengers" placeholder="1" />
          </fieldset>
          <fieldset>
            <input type="number" name="escales" id="escales" placeholder="N/a" />
            <input type="number" name="price" id="price" placeholder="N/a" />
          </fieldset>
          <fieldset className="origin">
            <input type="text" name="origin" id="origin" placeholder="SCQ - Lavacolla" />
          </fieldset>
          <fieldset className="destination">
            <input type="text" name="destination" id="destination" placeholder="FCO - Fiumiccino" />
          </fieldset>
          <fieldset className="date">
            <input type="date" name="sort" id="sort" />
            <input type="date" name="return" id="return" />
          </fieldset>
          <input type="submit" value="Buscar" />
        </form>
      </Article>
      <div className="Response-header">
        <ul className="Response__airports">
          <li>SCQ</li>
          <li className="roundTrip-icon"></li> {/* //? PUTO CSS? DE DONDE SALE ESTE ICONO? */}
          <li>FCO</li>
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
          <li>20dic</li>
          <li>26dic</li>
          <li>1 px</li>
        </ul>
      </div>
      <ul className="Response-list">
        <li className="Flight">
          <ul className="itinerary">
            <li className="company">VY - Vueling</li>
            <li className="times">
              <p>21:55</p>
              <div className="stops1">1</div>
              <p>11:25</p>
            </li>
            <li className="ports">
              <p>SCQ</p>
              <div>13h 30m</div>
              <p>FCO</p>
            </li>
          </ul>
          <ul className="itinerary">
            <li className="company">VY - Vueling / FR - Ryanair</li>
            <li className="times">
              <p>07:00</p>
              <div className="stops2">2</div>
              <p>13:45</p>
            </li>
            <li className="ports">
              <p>FCO</p>
              <div>6h 45m</div>
              <p>SCQ</p>
            </li>
          </ul>
          <ul className="offer">
            <li>137€</li>
            {auth && (
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
        <li className="Flight">Algo</li>
        <li className="Flight">Algo</li>
      </ul>
    </>
  );
};
