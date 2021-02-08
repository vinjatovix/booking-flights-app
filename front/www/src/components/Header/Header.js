import { React, useState, useEffect } from 'react';
import LogoMenu from '../../assets/svg/bars-solid.svg';
import CloseMenu from '../../assets/svg/cerrar.svg';
import { changeMenu } from '../../context/Auth.actions';
import './header.css';

const Header = ({ props }) => {
  const { menu, dispatch } = props;
  const [shape, setShape] = useState(LogoMenu);

  useEffect(() => {
    if (menu === true) {
      setShape(CloseMenu);
    } else {
      setShape(LogoMenu);
    }
  }, [menu]);

  const displayMenu = (e) => {
    e.preventDefault();
    dispatch(changeMenu({ menu }));
  };

  return (
    <header className="app-header">
      <h1>FL</h1>
      <img className="burguer" src={shape} alt="Botón de menú" onClick={displayMenu} />
    </header>
  );
};

export { Header };
