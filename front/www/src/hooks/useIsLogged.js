import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const useIsLogged = (token) => {
  const [data, setData] = useState();
  const [timestamp, setTimestamp] = useState(new Date());
  useEffect(() => {
    async function getRemoteDate() {
      const authRes = await fetch('http://localhost:8337/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const authJSON = await authRes.json();
      setData(authJSON);
    }
    getRemoteDate();
  }, [token, timestamp]);
  const refetch = () => setTimestamp(new Date());
  return [data, refetch];
};

useIsLogged.PropTypes = {
  token: PropTypes.string.isRequired,
};
