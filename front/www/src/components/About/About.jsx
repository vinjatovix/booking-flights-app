import React from 'react';
import { Article } from '../common/index';
import { ListDrawer } from '../common/ListDrawer/ListDrawer';
import PropTypes from 'prop-types';

import './about.css';
export const About = ({ logo = '', info, formers, stack, tools, links, credits, thanks }) => {
  const css = 'About radius';
  return (
    <div className="About__wrapper">
      <Article className={css} title="About">
        {logo && <img className="About-logo radius" src={logo} alt="logo" />}
        <ListDrawer type="p" title="Info" items={info}></ListDrawer>
        <ListDrawer type="links" title="Enlaces" cssClassName="aboutLinks" items={links} />
      </Article>
      <Article className={css} title="Tecnologías">
        <ListDrawer title="Pila" items={stack} />
        <ListDrawer title="Herramientas" items={tools} />
      </Article>
      <Article className={css} title="Créditos">
        <ListDrawer title="Formadores" items={formers} />
        <ListDrawer title="Agradecimientos" items={thanks} />
        <ListDrawer type="links" title="svg Icons" items={credits} />
      </Article>
    </div>
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
