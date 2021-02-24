import React from 'react';
import { switchBoolean } from '../../../context/auth/Auth.actions';
import { useAuthContext } from '../../../context/auth/Auth.context';
import { Input } from '../Input';
import './Disclaimer.css';
export const Disclaimer = () => {
  const [, dispatch] = useAuthContext();
  return (
    <section className="Disclaimer__section">
      <h1>Disclaimer</h1>
      <p>
        Aunque los datos de los vuelos son reales, esta aplicación es una simple demo de conocimientos adquiridos por
        Mateo Codesido y Pablo Viña durante el bootcamp JSB07CO de Hack A Boss en 2020/2021.
      </p>
      <p>Esta reserva no tiene valor real ni nos hacemos responsables del uso indebido de la aplicación.</p>
      <hr />
      <h1>Privacy by Design</h1>
      <p>De acuerdo con la RGPD, esta aplicación no requiere de datos personales para su uso.</p>
      <p>Tampoco almacenamos cookies. </p>
      <Input
        type="submit"
        value="Ok! ✈️ GO "
        name="disclaimer"
        className="radius OK"
        onClick={(e) => {
          e.preventDefault();
          dispatch(switchBoolean({ name: e.target.name, value: false }));
          console.log('ok');
        }}
      />
    </section>
  );
};
