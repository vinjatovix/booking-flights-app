import { React, useState } from 'react';
import LogoMenu from '../../assets/svg/bars-solid.svg';
import CloseMenu from '../../assets/svg/cerrar.svg';
import { changeMenu } from '../../context/Auth.actions';
import './header.css';

const Header = ({ props }) => {
  const { menu, logo, dispatch } = props;
  const [shape, setShape] = useState(LogoMenu);

  const displayMenu = (e) => {
    e.preventDefault();
    dispatch(changeMenu({ menu, logo }));

    if (logo === false) {
      setShape(CloseMenu);
    } else {
      setShape(LogoMenu);
    }

    //   if (shape === '/static/media/bars-solid.e8db7520.svg') {
    //     console.log(shape);

    //   }
  };

  return (
    <header className="app-header">
      <h1>FL</h1>
      <img className="burguer" src={shape} alt="Botón de menú" onClick={displayMenu} />
    </header>
  );
};

export { Header };
