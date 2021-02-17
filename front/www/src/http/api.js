import * as A from '../context/auth/Auth.actions';
import * as F from '../context/flight/Flight.actions';

const apiUrl = 'http://localhost:8337';

const requestMethods = { post: 'POST', get: 'GET' };
const endpoint = { login: '/login', signin: '/signin', about: '/about', me: '/me', book: '/book/flight' };

export const fetchForm = async (action, { body, method, token = '' }) => {
  const headers = new Headers();
  headers.append('Authorization', token);

  return await fetch(`${apiUrl}${action}`, { method, headers, body });
};

export const fetchBender = async (action, { body, method, token = '' }) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  headers.append('Authorization', token);
  const res = await fetch(`${action}`, { method: method, headers: headers, body: JSON.stringify(body) });
  const json = res.json();
  return json;
};

export async function benderLogin(req, { setErrorMessage, setToken, dispatch }) {
  try {
    const res = await fetchBender(`${apiUrl}${endpoint.login}`, {
      method: requestMethods.post,
      body: { ...req },
    });

    if (!res.ok) {
      throw res;
    }
    setToken(res.token);
  } catch (err) {
    dispatch(A.authFailure());
    setErrorMessage(err.details);
    setTimeout(() => setErrorMessage(''), 3000);
  }
}
export async function benderSignin(req, { setErrorMessage, setToken, dispatch }) {
  try {
    const res = await fetchBender(`${apiUrl}${endpoint.signin}`, {
      method: requestMethods.post,
      body: { ...req },
    });

    if (!res.ok) {
      throw res;
    }
    setToken(res.token);
  } catch (err) {
    dispatch(A.authFailure());
    setErrorMessage(err.details);
    setTimeout(() => setErrorMessage(''), 3000);
  }
}
export async function makeBooking(req, { token, errorMessage, setErrorMessage, dispatch }) {
  try {
    const res = await fetchBender(`${apiUrl}${endpoint.book}`, {
      method: requestMethods.post,
      body: { ...req },
    });
    //TODO: mostrar reserva en pantalla.
    console.log(res);

    if (!res.ok) {
      throw res;
    }
    // setToken(res.token);
  } catch (err) {
    // dispatch(A.authFailure());
    setErrorMessage(err.details);
    setTimeout(() => setErrorMessage(''), 3000);
  }
}

//TODO: limpiar esta funcionalidad
// export const searchFlight = async (
//   {
//     adults,
//     destinationLocationCode,
//     departureDate,
//     endPoint,
//     maxPrice,
//     loading,
//     nonStop,
//     originLocationCode,
//     returnDate,
//     searching,
//   },
//   { dispatch, isMounted }
// ) => {
//   const url = createUrl({
//     adults: adults || 1,
//     departureDate,
//     destinationLocationCode,
//     endPoint: endPoint,
//     maxPrice: maxPrice || 9999,
//     nonStop: nonStop === 'Directo',
//     originLocationCode,
//     returnDate: returnDate || '',
//   });
//   const res = await fetch(url, {
//     method: 'GET',
//   });

//   if (!res.ok) {
//     throw res;
//   }
//   const loot = await res.json();
//   if (isMounted.current) {
//     if (res.status !== 200) {
//       dispatch(A.switchBoolean({ name: 'loading', value: !loading }));
//       throw loot.details;
//     }
//     dispatch(F.setResponse(loot));
//   }
// };
