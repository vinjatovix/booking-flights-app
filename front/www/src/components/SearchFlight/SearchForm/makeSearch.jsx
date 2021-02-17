import * as F from '../../../context/flight/Flight.actions';


function createUrl({
    endPoint,
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    nonStop,
    max = 10,
    maxPrice = 9999,
  }) {
  
    return `${endPoint}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&nonStop=${nonStop}&adults=${adults}&max=${max}&maxPrice=${maxPrice}`;
  }
export async function makeSearch({ dispatch, data, endPoint, isMounted, loading, setErrorMessage, searching }) {
  dispatch(F.setResponse({}));
  const {
    adults,
    departureDate,
    destinationLocationCode,
    originLocationCode,
    maxPrice,
    returnDate,
    nonStop,
    oneWay,
  } = data;

  if (oneWay === 'Solo ida') {
    dispatch(F.setString({ name: 'returnDate', value: null }));
  }
  dispatch(F.setFlightQuestion(data));

  const url = createUrl({
    adults: adults || 1,
    departureDate,
    destinationLocationCode,
    endPoint: endPoint,
    maxPrice: maxPrice || 9999,
    originLocationCode,
    returnDate: returnDate || '',
    nonStop: nonStop === 'Directo',
  });
  // dispatch(A.switchBoolean({ name: 'loading', value: loading }));
  const res = await fetch(url, {
    method: 'GET',
  });
  const loot = await res.json();
  if (isMounted.current) {
    if (res.status !== 200) {
      dispatch(F.switchBoolean({ name: 'loading', value: !loading }));

      setErrorMessage(loot.details);
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      dispatch(F.switchBoolean({ name: 'searching', value: searching }));
      dispatch(F.setResponse(loot));
    }
  }
}
