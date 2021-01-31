import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const useRemoteUrl = (url, method) => {
  const [data, setData] = useState([]);
  const [timestamp, setTimestamp] = useState(new Date());
  useEffect(() => {
    async function getRemoteData() {
      const requestOptions = {
        method,
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await fetch(url, requestOptions);
      const newData = await response.json();
      setData(newData);
    }
    getRemoteData();
  }, [url, timestamp, method]);
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
