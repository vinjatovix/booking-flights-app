import * as A from "../context/auth/Auth.actions";
import * as F from "../context/flight/Flight.actions";

const apiUrl = process.env.REACT_APP_BENDER;
const requestMethods = { post: "POST", get: "GET", put: "PUT" };
const endpoint = {
  about: "/about",
  avatar: "/user/image",
  booking: "/book/flight",
  delete: "/update/delete",
  google: "/google",
  login: "/login",
  me: "/me",
  search: "/search/flights",
  signin: "/signin",
};

/* *******
? BLACK BOX 
********** */

export const fetchBender = async (action, { body, method, token = "" }) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  headers.append("Authorization", token);

  const res = await fetch(`${action}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });

  const json = res.json();
  return json;
};

function createSearchUrl({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults,
  nonStop,
  max = 100,
  maxPrice = 99999,
}) {
  return `${apiUrl}${endpoint.search}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&nonStop=${nonStop}&adults=${adults}&max=${max}&maxPrice=${maxPrice}`;
}

/* ********************
? CREDENTIALS
******************** */
export function askMeForToken(logged, token, dispatch) {
  if (logged || token) {
    try {
      const getRemoteData = async (token) => {
        const url = `${apiUrl}${endpoint.me}`;
        const json = await fetchBender(url, {
          method: "GET",
          token: token,
        });
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

export async function benderSignin(
  req,
  { setErrorMessage, setToken, dispatch }
) {
  try {
    const url = `${apiUrl}${endpoint.signin}`;
    const res = await fetchBender(url, {
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
    setTimeout(() => setErrorMessage(""), 3000);
  }
}

export async function benderLogin(
  req,
  { setErrorMessage, setToken, dispatch }
) {
  try {
    const url = `${apiUrl}${endpoint.login}`;
    const res = await fetchBender(url, {
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
    setTimeout(() => setErrorMessage(""), 3000);
  }
}

export async function googleLogin(
  req,
  { setErrorMessage, setToken, dispatch }
) {
  try {
    const url = `${apiUrl}${endpoint.google}`;
    const res = await fetchBender(url, {
      method: requestMethods.post,
      body: { idtoken: req },
    });

    if (!res.ok) {
      throw res;
    }
    setToken(res.token);
    dispatch(A.switchBoolean({ name: "google", value: false }));
  } catch (err) {
    dispatch(A.authFailure());
    setErrorMessage(err.details);
    setTimeout(() => setErrorMessage(""), 3000);
  }
}

export async function getPhoto(photo, token, dispatch) {
  if (!photo) {
  } else {
    if (!photo.includes("googleusercontent") && !photo.includes("localhost")) {
      const getAvatar = async () => {
        try {
          const url = `${apiUrl}${endpoint.avatar}?user=${photo}`;
          const res = await fetch(url, {
            method: requestMethods.get,
            headers: {
              "Content-type": "application/json",
              Authorization: token,
            },
          });
          if (res.status === 200) {
            const img = await res.blob();
            const localUrl = URL.createObjectURL(img);
            dispatch(A.setAvatar(localUrl));
          }
        } catch (err) {}
      };
      await getAvatar();
    }
  }
}

export async function deleteAccount(token, dispatch) {
  const url = `${apiUrl}${endpoint.delete}`;
  const res = await fetch(url, {
    method: requestMethods.put,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const json = await res.json();
  json.ok && dispatch(A.authFailure());
}

/* ********
? FLIGHTS 
********** */
export function askForBooking(dispatch, props, setErrorMessage) {
  return async () => {
    try {
      const token = localStorage.getItem("token");
      dispatch(F.switchBoolean({ name: "booking", value: false }));
      const res = await fetchBender(`${apiUrl}${endpoint.booking}`, {
        token: JSON.parse(token),
        method: "POST",
        body: { ...props },
      });
      dispatch(F.makeBooking(res.bookingCache));
    } catch (err) {
      setErrorMessage(err);
    }
  };
}

export async function makeSearch(
  data,
  { dispatch, isMounted, loading, setErrorMessage, searching }
) {
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

  if (oneWay === "Solo ida") {
    dispatch(F.setString({ name: "returnDate", value: null }));
  }
  dispatch(F.setFlightQuestion(data));

  const url = createSearchUrl({
    adults: adults || 1,
    departureDate,
    destinationLocationCode,
    maxPrice: maxPrice || 99999,
    originLocationCode,
    returnDate: returnDate || "",
    nonStop: nonStop === "Directo",
  });
  try {
    const res = await fetch(url, {
      method: "GET",
    });

    const loot = await res.json();
    if (isMounted.current) {
      if (res.status !== 200) {
        dispatch(F.switchBoolean({ name: "loading", value: !loading }));
        setErrorMessage(loot.details);
        setTimeout(() => setErrorMessage(""), 3000);
      } else {
        dispatch(F.switchBoolean({ name: "searching", value: searching }));
        dispatch(F.setResponse(loot));
      }
    }
  } catch (err) {
    setErrorMessage(err);
    setTimeout(() => setErrorMessage(""), 3000);
  }
}
