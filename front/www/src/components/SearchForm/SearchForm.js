import React from 'react';
import { Article } from '../common/Article';
import './searchForm.css';

export const SearchForm = () => {
  return (
    <Article title="Buscador">
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
          <input type="number" name="escales" id="escales" placeholder="No limit" />
          <input type="number" name="price" id="price" placeholder="No limit" />
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
  );
};
