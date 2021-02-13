import React, { useState, useEffect } from 'react';

import '../profile.css';

export const ProfileBookings = ({ dispatch, profile_bookings }) => {
  const [bookings, setBookings] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const css = {
    backgroundPositionX: '7.25rem',
  };

  useEffect(() => {
    async function getBookings() {
      const res = await fetch('http://localhost:8337/myBookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const json = await res.json();
      setBookings(json);
    }
    getBookings();
  }, []);

  return (
    <>
      <h4>Mis reservas</h4>
      <ul className="flight-offer">
        {bookings.map((item) => {
          return (
            <li>
              <section className="booking-date">
                <p>20</p>
                <p>ENE</p>
                <p>2020</p>
              </section>
              <section className="booking-info" style={!item.vuelo_Vuelta ? css : null}>
                <p className="booking-iata">MAD</p>
                <div>
                  <p className="booking-id">ID:234563</p>
                  <p className="booking-price">108,86€</p>
                </div>
                <p className="booking-iata">SCQ</p>
              </section>
              {item.vuelo_Vuelta ? (
                <section className="booking-date">
                  <p>6</p>
                  <p>AGO</p>
                  <p>2020</p>
                </section>
              ) : null}
            </li>
          );
        })}
      </ul>
    </>
  );
};
