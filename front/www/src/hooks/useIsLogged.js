import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const useIsLogged = (token) => {
  const [data, setData] = useState();
  const [timestamp, setTimestamp] = useState(new Date());
  useEffect(() => {
    async function getRemoteData() {
      const res = await fetch('http://localhost:8337/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const json = await res.json();
      setData(json);
    }
    getRemoteData();
  }, [token, timestamp]);
  const refetch = () => setTimestamp(new Date());
  return [data, refetch];
};

useIsLogged.PropTypes = {
  token: PropTypes.string.isRequired,
};
