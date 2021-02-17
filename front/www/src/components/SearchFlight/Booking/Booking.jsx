import React, { useEffect } from 'react';
import { useFlightContext } from '../../../context/flight/Flight.context';
import Avion from '../../../assets/svg/avion.svg';
import Linea from '../../../assets/svg/linea.svg';
import { setResponse, switchBoolean } from '../../../context/flight/Flight.actions';

export const Booking = () => {
  const [{ bookingCache, booking }, dispatch] = useFlightContext();
  const { header, details } = bookingCache;
  const { RC_base, RC_total, RC_adults, RC_ID } = header;
  const {
    Vue_origen,
    Vue_company,
    Vue_horaSalida,
    Vue_horaLlegada,
    Vue_duracion,
    Vue_destino,
    Vue_paradas,
  } = details.ida[0];

  // useEffect(() => {
  //   console.log('cambio');
  // }, [booking]);
  //   const { Vue_destino, Vue_horaLlegada } = details.ida[details.ida.length];
  return (
    <>
      <header className="modal-booking-header">
        <section className="booking-header-1">
          <h1>FL</h1>
          <small>0.6</small>
        </section>
        <section className="booking-header-2">
          <h5>{`ID: ${RC_ID}`}</h5>
        </section>
      </header>
      <section className="booking-towns">
        <div className="booking-towns-1">
          <h5>Origen</h5>
          <h1>{Vue_origen}</h1>
        </div>
        <div className="booking-towns-2">
          <h5>Destino</h5>
          <h1>{Vue_destino}</h1>
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
              <h4>{Vue_horaSalida.split('T')[0]}</h4>
              <h4>{Vue_horaSalida.split('T')[1]}</h4>
            </div>
            <div>
              <h5>{Vue_company}</h5>
              <h6>{Vue_duracion.replace('PT', '')}</h6>
              <h6>Escalas: {Vue_paradas}</h6>
            </div>
            <div>
              <h5>LLEGADA</h5>
              <h4>{Vue_horaLlegada.split('T')[0]}</h4>
              <h4>{Vue_horaLlegada.split('T')[1]}</h4>
            </div>
          </section>
        </div>
      </main>
      <section className="modal-booking-aditional-data">
        <div>
          <h5>PLAZAS</h5>
          <h4>{`${header.RC_adults}`}</h4>
        </div>
        <div>
          <h5>ESCALAS</h5>
          <h4>0</h4>
        </div>
        <div>
          <h5>PRECIO</h5>
          <h4>{`${header.RC_base}€`}</h4>
        </div>
      </section>
      <footer className="modal-booking-footer">
        <div>
          <h5>TOTAL</h5>
          <h4>{`${header.RC_total}€`}</h4>
        </div>
        <button
          className="button-close"
          onClick={(e) => {
            e.preventDefault();
            console.log('close');
            dispatch(switchBoolean({ name: 'booking', value: booking }));
            dispatch(switchBoolean({ name: 'searching', value: booking }));
            dispatch(setResponse({}));
          }}
        >
          Cerrar
        </button>
      </footer>
    </>
  );
};
