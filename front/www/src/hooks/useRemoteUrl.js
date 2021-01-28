import { useState, useEffect } from 'react';

export const useRemoteUrl = (url) => {
  const [data, setData] = useState([]);
  const [timestamp, setTimestamp] = useState(new Date());
  useEffect(() => {
    async function getRemoteData() {
      const response = await fetch(url);
      const newData = await response.json();
      setData(newData);
    }
    getRemoteData();
  }, [url, timestamp]);
  const refetch = () => setTimestamp(new Date());
  return [data, refetch];
};
