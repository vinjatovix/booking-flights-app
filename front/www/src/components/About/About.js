import React from 'react';
import './about.css';
import { Article } from '../common/Article';
import { ListDrawer } from '../common/ListDrawer/ListDrawer';
import { ArticleWrapper } from '../common/ArticleWrapper';
import PropTypes from 'prop-types';

export const About = ({ logo, info, formers, stack, tools, links, credits, thanks }) => {
  return (
    <>
      <ArticleWrapper>
        <Article className="about" title="About">
          <img className="about-logo" src={logo} alt="logo" />
          <ListDrawer type="p" title="Info" items={info}></ListDrawer>
          <ListDrawer type="links" title="Enlaces" cssClassName="aboutLinks" items={links} />
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
};
About.propTypes = {
  logo: PropTypes.string,
  info: PropTypes.array.isRequired,
  formers: PropTypes.array,
  tools: PropTypes.array,
  stack: PropTypes.array,
  links: PropTypes.array,
  credits: PropTypes.array,
  thanks: PropTypes.array,
};
