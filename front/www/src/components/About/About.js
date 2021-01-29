import React from "react";
import "./about.css"
import { Article } from "../common/Article";
import { AboutLinks } from "./AboutLinks"; //? Component
import { aboutInfo } from "./aboutInfo"; //? items

export const About = () => {
  return (
    <section>
      <Article className="about" title="About">
      <img className="about-logo" src={aboutInfo.logo} alt="logo"/>
        <p>{aboutInfo.text}</p>
        <AboutLinks
          cssClassName="aboutLinks"
          title="FYI"
          items={aboutInfo.links}
        />
      </Article>
    </section>
  );
};
