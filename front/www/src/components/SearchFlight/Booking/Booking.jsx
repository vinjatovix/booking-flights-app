import React from 'react';
import { useFlightContext } from '../../../context/flight/Flight.context';
import Avion from '../../../assets/svg/avion.svg';
import Linea from '../../../assets/svg/linea.svg';
import { setResponse, switchBoolean } from '../../../context/flight/Flight.actions';

export const Booking = () => {
  const [{ bookingCache, booking }, dispatch] = useFlightContext();
  const { header, details } = bookingCache;
  const ida = details.ida;
  const vuelta = details?.vuelta ? details.vuelta : null;
  const { RC_ID, RC_adults, RC_base, RC_total } = header;
  console.log(bookingCache);

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
          <h4>{ida[0].Vue_origenLoca}</h4>
        </div>
        <div className="booking-towns-2">
          <h4>{ida[ida.length - 1].Vue_destinoLoca}</h4>
        </div>
      </section>
      <main className="modal-booking-main">
        <div className="ida">
          <section className="modal-booking-logos">
            <img src={Linea} alt="linea-de-trayecto" />
            <img src={Avion} alt="silueta-avion" />
            <img src={Linea} alt="linea-de-trayecto" />
          </section>
          <section className="modal-booking-flight-data">
            <div>
              <h5>SALIDA</h5>
              <p>{ida[0].Vue_origen}</p>
              <h4>{ida[0].Vue_horaSalida.split('T')[0]}</h4>
              <h4>{ida[0].Vue_horaSalida.split('T')[1].replace(':00', '')}</h4>
            </div>
            <div>
              <h5>{header.aerolineaIda}</h5>
              <h6>Duración: {header.duracionIda.replace('PT', '').replace('H', ':').replace('M', '')}</h6>
              <h6>Escalas: {ida.length - 1}</h6>
            </div>
            <div>
              <h5>LLEGADA</h5>
              <p>{ida[ida.length - 1].Vue_destino}</p>
              <h4>{ida[ida.length - 1].Vue_horaLlegada.split('T')[0]}</h4>
              <h4>{ida[ida.length - 1].Vue_horaLlegada.split('T')[1].replace(':00', '')}</h4>
            </div>
          </section>
        </div>
        {vuelta && (
          <div className="vuelta">
            <section className="modal-booking-logos">
              <img src={Linea} alt="linea-de-trayecto" />
              <img src={Avion} alt="silueta-avion" style={{ transform: 'rotation(180deg)' }} />
              <img src={Linea} alt="linea-de-trayecto" />
            </section>
            <section className="modal-booking-flight-data">
              <div>
                <h5>SALIDA</h5>
                <p>{vuelta[0].Vue_origen}</p>
                <h4>{vuelta[0].Vue_horaSalida.split('T')[0]}</h4>
                <h4>{vuelta[0].Vue_horaSalida.split('T')[1].replace(':00', '')}</h4>
              </div>
              <div>
                <h5>{header.aerolineaVuelta}</h5>
                <h6>Duración: {header.duracionVuelta.replace('PT', '').replace('H', ':').replace('M', '')}</h6>
                <h6>Escalas: {vuelta.length - 1}</h6>
              </div>
              <div>
                <h5>LLEGADA</h5>
                <p>{vuelta[vuelta.length - 1].Vue_destino}</p>
                <h4>{vuelta[vuelta.length - 1].Vue_horaLlegada.split('T')[0]}</h4>
                <h4>{vuelta[vuelta.length - 1].Vue_horaLlegada.split('T')[1].replace(':00', '')}</h4>
              </div>
            </section>
          </div>
        )}
      </main>
      <section className="modal-booking-aditional-data">
        <div>
          <h5>PLAZAS</h5>
          <h4>{RC_adults}</h4>
        </div>
        <div>
          <h5>ESCALAS</h5>
          <h4>
            I: {ida.length - 1}/ V: {vuelta.length - 1}
          </h4>
        </div>
        <div>
          <h5>PRECIO BASE</h5>
          <h4>{`${RC_base}€`}</h4>
        </div>
      </section>
      <footer className="modal-booking-footer">
        <div>
          <h5>PRECIO FINAL</h5>
          <h4>{`${RC_total}€`}</h4>
        </div>
        <button
          className="button-close"
          onClick={(e) => {
            e.preventDefault();
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
