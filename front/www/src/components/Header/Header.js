import { React, useState } from 'react';
import LogoMenu from '../../assets/svg/bars-solid.svg';
import CloseMenu from '../../assets/svg/cerrar.svg';
import './header.css';

const Header = ({ props }) => {
  const { open, setOpen } = props;
  const [shape, setShape] = useState(LogoMenu);

  const displayMenu = (e) => {
    e.preventDefault();
    setOpen(!open);

    if (open === false) {
      setShape(CloseMenu);
    } else {
      setShape(LogoMenu);
    }
  };

  return (
    <header className="app-header">
      <h1>FL</h1>
      <img className="burguer" src={shape} alt="Botón de menú" onClick={displayMenu} />
    </header>
  );
};

export { Header };
