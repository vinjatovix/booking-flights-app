import React from 'react';
import Avion from '../../../assets/svg/avion.svg';
import Linea from '../../../assets/svg/linea.svg';

export const Itinerary = ({header,itinerary}) => {
  return (
    <div className="ida">
      <section className="modal-booking-logos">
        <img src={Linea} alt="linea-de-trayecto" />
        <img src={Avion} alt="silueta-avion" />
        <img src={Linea} alt="linea-de-trayecto" />
      </section>
      <section className="modal-booking-flight-data">
        <div>
          <h5>SALIDA</h5>
          <p>{itinerary[0].Vue_origen}</p>
          <h4>{itinerary[0].Vue_horaSalida.split('T')[0]}</h4>
          <h4>{itinerary[0].Vue_horaSalida.split('T')[1].replace(':00', '')}</h4>
        </div>
        <div>
          <h5>{header.aerolineaIda}</h5>
          <h6>Duración: {header.duracionIda.replace('PT', '').replace('H', ':').replace('M', '')}</h6>
          <h6>Escalas: {itinerary.length - 1}</h6>
        </div>
        <div>
          <h5>LLEGADA</h5>
          <p>{itinerary[itinerary.length - 1].Vue_destino}</p>
          <h4>{itinerary[itinerary.length - 1].Vue_horaLlegada.split('T')[0]}</h4>
          <h4>{itinerary[itinerary.length - 1].Vue_horaLlegada.split('T')[1].replace(':00', '')}</h4>
        </div>
      </section>
    </div>
  );
};
