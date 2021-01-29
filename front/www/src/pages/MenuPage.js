import React from 'react';
import { Menu } from '../components/Menu/Menu';
import { Article } from '../components/common/Article';
import '../css/index.css';

export const MenuPage = () => {
  return (
    <section className="menu-oculto">
      <Article title="Menú">
        <Menu />
      </Article>
    </section>
  );
};
