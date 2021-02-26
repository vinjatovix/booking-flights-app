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
        Esta aplicación es una demo de conocimientos adquiridos por Mateo Codesido y Pablo Viña durante el bootcamp JSB07CO de Hack A Boss en 2020/2021.
      </p>
      <p>Los datos son reales pero esta reserva no tiene valor real ni nos hacemos responsables del uso indebido de la aplicación.</p>
      <hr />
      <h4>Privacy by Design</h4>
      <p>
        De acuerdo con el principio de minimización de datos del RGPD, esta aplicación no requiere de datos personales
        para su uso.
      </p>{' '}
      <p>Los datos proporcionados serán mínimos y adecuados a la prestación del servicio (email).</p>
      <p>
        El tratamiento de los datos será leal y transparente. Puede eliminar su cuenta en cualquier momento desde el
        panel de control. Este proceso será irreversible.
      </p>
      <Input
        type="submit"
        value="Ok! ✈️ GO "
        name="disclaimer"
        className="radius OK"
        onClick={(e) => {
          e.preventDefault();
          dispatch(switchBoolean({ name: e.target.name, value: false }));
        }}
      />
    </section>
  );
};
