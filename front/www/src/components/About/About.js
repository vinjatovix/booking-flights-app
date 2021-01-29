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
            <p key={p.id}>{p.text}</p>
          ))}
          <AboutLinks cssClassName="aboutLinks" title="FYI" items={links} />
        </Article>
      </section>
      <section>
        <Article className="about" title="Pila">
          <ul>
            {stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </Article>
      </section>
      <section>
        <Article className="about" title="Herramientas">
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </Article>
      </section>
      <section>
        <Article className="about" title="Créditos">
          <h3>Formadores</h3>
          {formers.map((teacher) => (
            <li key={teacher}>{teacher}</li>
          ))}
          <h3>Agradecimientos</h3>
          {thanks.sort().map((person) => (
            <li key={person}>{person}</li>
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
