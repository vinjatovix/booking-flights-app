import * as A from '../context/Auth.actions';
import { fetchBender } from '../http/api';

export function askMeForToken(logged, token, dispatch) {
  if (logged || token !== '') {
    //? Aquí se haría una llamada a la API para verificar el token,
    //? normalmente se hace a una ruta /me en caso de que sea correcto se despacha.
    try {
      const getRemoteData = async (token) => {
        const json = await fetchBender('/me', { method: 'GET', token: token });
        if (!json.ok) {
          dispatch(A.authFailure());
        } else {
          const { decodedToken } = json;
          dispatch(
            //? dispatch es el método que contiene las acciones.
            //? es el cinturón de batman del contexto.
            //? si el token es correcto seteamos el state con los datos recibidos del servidor
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
      //? en caso de error o fallo en la petición,
      //? del cinturón de batman escogemos la herramienta que resetea el estado.
      dispatch(A.authFailure());
    }
  }
}
