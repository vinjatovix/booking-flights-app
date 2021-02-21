import React, { useEffect } from 'react';
import { Article } from '../../common/Article';
import { ResponseFlight } from './ResponseFlight';
import * as A from '../../../context/flight/Flight.actions';
import './responseList.css';

export const ResponseList = React.memo(({ data, logged, response, searching, adults, dispatch }) => {
  useEffect(() => {}, [response]);
  return (
    <ul className="Response-list">
      {typeof response?.data === 'string' && searching && (
        <Article className="Response-empty radius" title="oh...">
          {response.data}
          <input
            value="Volver"
            className="radius"
            type="submit"
            id="reset"
            onClick={(e) => {
              e.preventDefault();
              dispatch(A.switchBoolean({ name: 'searching', value: searching }));
            }}
          ></input>
        </Article>
      )}
      {response?.adults &&
        response?.data?.map((element) => (
          <ResponseFlight
            key={element.id}
            id={element.id}
            logged={logged}
            adults={adults}
            dispatch={dispatch}
            {...element}
          />
        ))}
    </ul>
  );
});
