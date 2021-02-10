const apiUrl = 'http://localhost:8337';

const requestMethods = { post: 'POST', get: 'GET' };
const endpoint = { login: '/login', signin: '/signin', about: '/about' };

export const fetchForm = async (action, { body, method, token = '' }) => {
  const headers = new Headers();
  headers.append('Authorization', token);

  return await fetch(`${apiUrl}${action}`, { method, headers, body });
};

export const fetchBender = async (action, { body, method, token = '' }) => {
  const headers = new Headers();
  headers.append('Authorization', token);
  const res = await fetch(`${apiUrl}${action}`, { method: method, headers: headers, body: JSON.stringify(body) });
  const json = res.json();
  return json;
};
