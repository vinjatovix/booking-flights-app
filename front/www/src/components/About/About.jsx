import React, { useEffect, useState } from 'react';
import { Article } from '../common/Article';
import { ListDrawer } from '../common/ListDrawer/ListDrawer';
import PropTypes from 'prop-types';

import './about.css';
import { useAuthContext } from '../../context/auth/Auth.context';
export const About = ({ logo = '', info, formers, stack, tools, links, credits, thanks }) => {
  const [{ menu }] = useAuthContext();
  const [css, setCss] = useState('About radius focus');

  useEffect(() => {
    menu ? setCss('About radius blur') : setCss('About radius focus');
  }, [menu]);

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
