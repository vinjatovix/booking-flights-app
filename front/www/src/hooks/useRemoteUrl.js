import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const useRemoteUrl = (url, method) => {
  const [data, setData] = useState({ data: null, loading: true, error: null });
  const [timestamp, setTimestamp] = useState(new Date());
  useEffect(() => {
    async function getRemoteData() {
      const requestOptions = {
        method,
        headers: {
          'Content-type': 'application/json',
        },
      };
      const res = await fetch(url, requestOptions);
      const json = await res.json();
      setData({ data: json, error: null, loading: false });
    }
    getRemoteData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, timestamp]);
  const refetch = () => setTimestamp(new Date());
  return [data, refetch];
};

useRemoteUrl.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string,
};
useRemoteUrl.defaultProps = {
  method: 'GET',
};
