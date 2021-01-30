import { useState, useEffect } from "react";

export const useRemoteUrl = (url) => {
  const [data, setData] = useState([]);
  const [timestamp, setTimestamp] = useState(new Date());
  useEffect(() => {
    async function getRemoteData() {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(url, requestOptions);
      const newData = await response.json();
      setData(newData);
    }
    getRemoteData();
  }, [url, timestamp]);
  const refetch = () => setTimestamp(new Date());
  return [data, refetch];
};
