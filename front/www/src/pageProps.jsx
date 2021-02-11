const apiUrl = 'http://localhost:8337';

export const path = {
  logIn: `${apiUrl}/logIn`,
  about: `${apiUrl}/about`,
  signIn: `${apiUrl}/signIn`,
  flights: `${apiUrl}/search/flights`,
  me: `${apiUrl}/me`,
};

export const searchProps = {
  title: 'Buscador',
  action: path.flights,
};
export const aboutProps = {
  action: path.about,
};
export const meProps = {
  action: path.me,
};
