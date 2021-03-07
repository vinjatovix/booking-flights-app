import React from "react";
import { About } from "../components/About/About";
import { useRemoteUrl } from "../hooks/useRemoteUrl";

export const AboutPage = () => {
  const [aboutInfo] = useRemoteUrl(process.env.REACT_APP_ABOUT_URL);
  const { data, loading } = aboutInfo;

  return (
    <>
      {loading && "Loading"}
      {data && <About {...data} />}
    </>
  );
};
