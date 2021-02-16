import React from 'react';
import * as A from '../../../context/Auth.actions';
import Linea from '../../../assets/svg/linea.svg';
import Avion from '../../../assets/svg/avion.svg';

export const GetBooking = ({ props }) => {
  const { dispatch, modal, item } = props;
  console.log(item);
  return (
    <>
      <header className="modal-booking-header">
        <section className="booking-header-1">
          <h1>FL</h1>
          <small>0.6</small>
        </section>
        <section className="booking-header-2">
          <h5>ID: 9823758</h5>
        </section>
      </header>
      <section className="booking-towns">
        <div className="booking-towns-1">
          <h5>Barcelona</h5>
          <h1>BCN</h1>
        </div>
        <div className="booking-towns-2">
          <h5>Múnich</h5>
          <h1>MUC</h1>
        </div>
      </section>
      <main className="modal-booking-main">
        <div>
          <section className="modal-booking-logos">
            <img src={Linea} alt="linea-de-trayecto" />
            <img src={Avion} alt="silueta-avion" />
            <img src={Linea} alt="linea-de-trayecto" />
          </section>
          <section className="modal-booking-flight-data">
            <div>
              <h5>SALIDA</h5>
              <h4>04/06/2018</h4>
              <h4>07:10H</h4>
            </div>
            <div>
              <h5>IBERIA</h5>
            </div>
            <div>
              <h5>LLEGADA</h5>
              <h4>12/05/2020</h4>
              <h4>09:20H</h4>
            </div>
          </section>
          <section className="modal-booking-flight-data">
            <div>
              <h5>SALIDA</h5>
              <h4>04/06/2018</h4>
              <h4>07:10H</h4>
            </div>
            <div>
              <h5>IBERIA</h5>
            </div>
            <div>
              <h5>LLEGADA</h5>
              <h4>12/05/2020</h4>
              <h4>09:20H</h4>
            </div>
          </section>
        </div>
      </main>
      <section className="modal-booking-aditional-data">
        <div>
          <h5>PLAZAS</h5>
          <h4>2</h4>
        </div>
        <div>
          <h5>ESCALAS</h5>
          <h4>0</h4>
        </div>
        <div>
          <h5>PRECIO</h5>
          <h4>1.378,66€</h4>
        </div>
      </section>
      <footer className="modal-booking-footer">
        <h5>Tu vuelo tiene una duración de 2H y 35M</h5>
        <div>
          <h5>TOTAL</h5>
          <h4>3.754,56€</h4>
        </div>
        <button
          className="button-close"
          onClick={() => {
            dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
          }}
        >
          Cerrar
        </button>
      </footer>
    </>
  );
};
