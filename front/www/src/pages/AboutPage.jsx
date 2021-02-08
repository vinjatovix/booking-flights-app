import React from 'react';
import { About } from '../components/About/About';
import { useRemoteUrl } from '../hooks/useRemoteUrl';

export const AboutPage = ({ url }) => {
  const [aboutInfo] = useRemoteUrl(url);
  const { data,loading } = aboutInfo;

  return (
    <>
      {loading && 'Loading'}
      {data && <About {...data} />}
    </>
  );
};
