import React from 'react';
import * as A from '../../../context/auth/Auth.actions';

export const GetBooking = ({ props }) => {
  const { dispatch, modal, item, iata, date, timetable, duration } = props;
  console.log(item.vuelo_Ida.compania);
  return (
    <>
      <header className="modal-header">
        <section className="modal-header__logo">
          <div></div>
          <h1>FL</h1>
          <h3>0.6</h3>
        </section>
        <section className="modal-header__id">
          <h5>{`ID: ${item.details.id}`}</h5>
        </section>
      </header>
      <main className="modal-main">
        <section className="modal-main__towns">
          <div className="modal-main__towns-cities">
            <h5>{item.vuelo_Ida.locaOrigen}</h5>
            <h5>{item.vuelo_Ida.locaDesti}</h5>
          </div>
          <div className="modal-main__towns-iata">
            <h3>{iata[0]}</h3>
            <h3>{iata[1]}</h3>
          </div>
        </section>
        <section className="modal-main__info">
          <section className="modal-main__info-picture">
            <div className="modal-main__info-picture-line"></div>
            <div className="modal-main__info-picture-plane"></div>
            <div className="modal-main__info-picture-line"></div>
          </section>
          <section className="modal-main__info-data">
            <div className="modal-main__info-data-dep">
              <h5>SALIDA</h5>
              <h5>{`${date[0]}/${date[1]}/${date[2]}`}</h5>
              <h5>{`${timetable[0]}H`}</h5>
            </div>
            <div className="modal-main__info-data-company">
              <h5>{item.vuelo_Ida.compania}</h5>
            </div>
            <div className="modal-main__info-data-arr">
              <h5>LLEGADA</h5>
              <h5>{`${date[3]}/${date[4]}/${date[5]}`}</h5>
              <h5>{`${timetable[1]}H`}</h5>
            </div>
          </section>
          {item.vuelo_Vuelta && (
            <section className="modal-main__info-data">
              <div className="modal-main__info-data-dep">
                <h5>SALIDA</h5>
                <h5>{`${date[6]}/${date[7]}/${date[8]}`}</h5>
                <h5>{`${timetable[2]}H`}</h5>
              </div>
              <div className="modal-main__info-data-company">
                <h5>{item.vuelo_Vuelta.compania}</h5>
              </div>
              <div className="modal-main__info-data-arr">
                <h5>LLEGADA</h5>
                <h5>{`${date[9]}/${date[10]}/${date[11]}`}</h5>
                <h5>{`${timetable[3]}H`}</h5>
              </div>
            </section>
          )}
        </section>
        <section className="modal-main__extra">
          <div>
            <h5>PLAZAS</h5>
            <h5>{item.details.plazas}</h5>
          </div>
          <div>
            <h5>ESCALAS</h5>
            {item.vuelo_Vuelta ? (
              <h5>{`I: ${item.vuelo_Ida.escalas}/V: ${item.vuelo_Vuelta.escalas}`}</h5>
            ) : (
              <h5>{item.vuelo_Ida.escalas}</h5>
            )}
          </div>
          <div>
            <h5>PRECIO</h5>
            <h5>{`${item.details.precio}€`}</h5>
          </div>
        </section>
        <section className="modal-main__total">
          {item.vuelo_Vuelta ? (
            <h5>{`El vuelo de ida tiene una duración de ${duration[0]}H y ${duration[1]}M y el de vuelta ${duration[2]}H y ${duration[3]}M`}</h5>
          ) : (
            <h5>{`Tu vuelo tiene una duración de ${duration[0]}H y ${duration[1]}M`}</h5>
          )}
          <div>
            <h5>TOTAL</h5>
            <h4>{`${item.details.total}€`}</h4>
          </div>
        </section>
      </main>
      <footer className="modal-footer">
        <button
          className="modal-button close-button"
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
