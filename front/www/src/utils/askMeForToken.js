import * as A from '../context/auth/Auth.actions';
import { fetchBender } from '../http/api';
import { path } from '../pageProps';

export function askMeForToken(logged, token, dispatch) {
  if (logged || token ) {
    try {
      const getRemoteData = async (token) => {
        const json = await fetchBender(path.me, { method: 'GET', token: token });
        if (!json.ok) {
          dispatch(A.authFailure());
        } else {
          const { decodedToken } = json;
          dispatch(
            A.authSuccess({
              username: decodedToken.username,
              email: decodedToken.email,
              id: decodedToken.id,
              photo: decodedToken.photo,
              bio: decodedToken.bio,
              status: decodedToken.status,
            })
          );
        }
      };
      getRemoteData(token);
    } catch (error) {
      dispatch(A.authFailure());
    }
  }
}
