import React, { useState, useEffect } from 'react';
import LogoMenu from '../../assets/svg/bars-solid.svg';
import CloseMenu from '../../assets/svg/cerrar.svg';
import { changeMenu } from '../../context/Auth.actions';
import './header.css';

const Header = React.memo((props) => {
  const { menu, dispatch } = props;
  const [shape, setShape] = useState(LogoMenu);

  useEffect(() => {
    menu ? setShape(CloseMenu) : setShape(LogoMenu);
  }, [menu]);

  const displayMenu = (e) => {
    e.preventDefault();
    dispatch(changeMenu({ menu }));
  };

  return (
    <header className="app-header">
      <h1>FL<small> 0.6</small></h1>
      <img className="burguer" src={shape} alt="Botón de menú" onClick={displayMenu} />
    </header>
  );
});

export { Header };
