import React from "react";
import "./about.css";
import { Article } from "../common/Article";
import { AboutLinks } from "./AboutLinks"; //? Component
import { aboutInfo } from "./aboutInfo"; //? items

export const About = () => {
  const {
    logo,
    intro,
    info,
    formers,
    stack,
    tools,
    links,
    credits,
    thanks,
  } = aboutInfo;
  return (
    <>
      <section>
        <Article className="about" title="About">
          <img className="about-logo" src={logo} alt="logo" />
          <p>{intro}</p>
          {info.map((p) => (
            <p>{p}</p>
          ))}
          <AboutLinks cssClassName="aboutLinks" title="FYI" items={links} />
        </Article>
      </section>
      <section>
        <Article className="about" title="Pila">
          <ul>
            {stack.map((tech) => (
              <li>{tech}</li>
            ))}
          </ul>
        </Article>
      </section>
      <section>
        <Article className="about" title="Herramientas">
          {tools.map((tool) => (
            <li>{tool}</li>
          ))}
        </Article>
      </section>
      <section>
        <Article className="about" title="Créditos">
          <h3>Formadores</h3>
          {formers.map((teacher) => (
            <li>{teacher}</li>
          ))}
          <h3>Agradecimientos</h3>
          {thanks.sort().map((person) => (
            <li>{person}</li>
          ))}
          <AboutLinks
            cssClassName="aboutLinks"
            title="svg Icons"
            items={credits}
          />
        </Article>
      </section>
    </>
  );
};
