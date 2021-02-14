import * as A from '../context/Auth.actions';

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
    console.log(token);
    const res = await fetchBender(`${apiUrl}${endpoint.book}`, {
      method: requestMethods.post,
      body: { ...req },
    });
    console.log(res);

    if (!res.ok) {
      throw res;
    }
    // setToken(res.token);
  } catch (err) {
    console.log(err);
    // dispatch(A.authFailure());
    setErrorMessage(err.details);
    console.log(errorMessage);
    setTimeout(() => setErrorMessage(''), 3000);
  }
}
