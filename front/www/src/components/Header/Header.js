import React from 'react';
import LogoMenu from '../../assets/svg/bars-solid.svg';

const Header = () => {
  const displayMenu = (e) => {
    e.preventDefault();
    console.log('Hola');
  };

  return (
    <header className="app-header">
      <h1>FL</h1>
      <img
        className="burguer"
        src={LogoMenu}
        alt="Botón de menú"
        onClick={displayMenu}
      />
    </header>
  );
};

export { Header };

//  {
//    /* <nav>
//             <ul>
//               <li>
//                 <NavLink to="/login">Login</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/register">Register</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/about">About</NavLink>
//               </li>
//             </ul>
//           </nav> */
//  }
