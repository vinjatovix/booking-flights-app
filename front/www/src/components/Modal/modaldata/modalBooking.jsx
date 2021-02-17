import React from 'react';
import * as A from '../../../context/auth/Auth.actions';
import Linea from '../../../assets/svg/linea.svg';
import Avion from '../../../assets/svg/avion.svg';

export const GetBooking = ({ props }) => {
  const { dispatch, modal, item, iata, date, timetable } = props;
  console.log(item);
  console.log(iata);
  console.log(date);
  console.log(timetable);
  return (
    <>
      <header className="modal-booking-header">
        <section className="booking-header-1">
          <h1>FL</h1>
          <small>0.6</small>
        </section>
        <section className="booking-header-2">
          <h5>{`ID: ${item.details.id}`}</h5>
        </section>
      </header>
      <section className="booking-towns">
        <div className="booking-towns-1">
          <h5>{item.vuelo_Ida.locaOrigen}</h5>
          <h1>{iata[0]}</h1>
        </div>
        <div className="booking-towns-2">
          <h5>{item.vuelo_Ida.locaDesti}</h5>
          <h1>{iata[1]}</h1>
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
              <h4>{`${date[0]}/${date[1]}/${date[2]}`}</h4>
              <h4>{`${timetable[0]}H`}</h4>
            </div>
            <div>
              <h5>{item.vuelo_Ida.compañia}</h5>
            </div>
            <div>
              <h5>LLEGADA</h5>
              <h4>{`${date[3]}/${date[4]}/${date[5]}`}</h4>
              <h4>{`${timetable[1]}H`}</h4>
            </div>
          </section>
          <section className="modal-booking-flight-data">
            <div>
              <h5>SALIDA</h5>
              <h4>{`${date[6]}/${date[7]}/${date[8]}`}</h4>
              <h4>{`${timetable[2]}H`}</h4>
            </div>
            <div>
              <h5>{item.vuelo_Vuelta.compañia}</h5>
            </div>
            <div>
              <h5>LLEGADA</h5>
              <h4>{`${date[9]}/${date[10]}/${date[11]}`}</h4>
              <h4>{`${timetable[3]}H`}</h4>
            </div>
          </section>
        </div>
      </main>
      <section className="modal-booking-aditional-data">
        <div>
          <h5>PLAZAS</h5>
          <h4>{item.details.plazas}</h4>
        </div>
        <div>
          <h5>ESCALAS</h5>
          <h4>0</h4>
        </div>
        <div>
          <h5>PRECIO</h5>
          <h4>{`${item.details.precio}€`}</h4>
        </div>
      </section>
      <footer className="modal-booking-footer">
        <h5>Tu vuelo tiene una duración de 2H y 35M</h5>
        <div>
          <h5>TOTAL</h5>
          <h4>{`${item.details.total}€`}</h4>
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
