import React from 'react';
import { About } from '../components/About/About';
import { useRemoteUrl } from '../hooks/useRemoteUrl';

export const AboutPage = ({ action }) => {
  const [aboutInfo] = useRemoteUrl(action);
  const { data,loading } = aboutInfo;

  return (
    <>
      {loading && 'Loading'}
      {data && <About {...data} />}
    </>
  );
};
