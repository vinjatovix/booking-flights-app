import React from 'react';
import { About } from '../components/About/About';
import { useRemoteUrl } from '../hooks/useRemoteUrl';

export const AboutPage = ({ url }) => {
  const [aboutInfo] = useRemoteUrl(url);

  return (
    <>
      {!aboutInfo?.ok && 'Loading'}
      {aboutInfo.ok && <About {...aboutInfo} />}
    </>
  );
};
