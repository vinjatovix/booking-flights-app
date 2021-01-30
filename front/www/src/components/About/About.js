import React from "react";
import "./about.css";
import { Article } from "../common/Article";
import { ListDrawer } from "../common/ListDrawer/ListDrawer";
import { ArticleWrapper } from "../common/ArticleWrapper";
import { useRemoteUrl } from "../../hooks/useRemoteUrl";
// import { useRemoteUrl } from "../../hooks/useRemoteUrl";

export const About = () => {
  const [aboutInfo, setAboutInfo] = useRemoteUrl("http://localhost:8337/about");
  const {
    logo,
    info,
    formers,
    stack,
    tools,
    links,
    credits,
    thanks,
  } = aboutInfo;
  const res = (
    <>
      <ArticleWrapper>
        <Article className="about" title="About">
          <img className="about-logo" src={logo} alt="logo" />
          <ListDrawer type="p" title="Info" items={info}></ListDrawer>
          <ListDrawer
            type="links"
            title="Enlaces"
            cssClassName="aboutLinks"
            items={links}
          />
        </Article>
      </ArticleWrapper>

      <ArticleWrapper>
        <Article className="about" title="Tecnologías">
          <ListDrawer title="Pila" items={stack} />
          <ListDrawer title="Herramientas" items={tools} />
        </Article>
      </ArticleWrapper>
      <ArticleWrapper>
        <Article className="about" title="Créditos">
          <ListDrawer title="Formadores" items={formers} />
          <ListDrawer title="Agradecimientos" items={thanks} />
          <ListDrawer type="links" title="svg Icons" items={credits} />
        </Article>
      </ArticleWrapper>
    </>
  );
  return <>
  {!aboutInfo?.ok && "loading...."}
  {aboutInfo.ok && res}
  </>;
};
