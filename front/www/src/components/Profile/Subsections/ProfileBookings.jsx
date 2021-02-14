import React, { useState, useEffect } from 'react';
import { formatDate, monthName } from '../../../utils/dateUtils';
import { getIata } from '../../../utils/getIata';
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
      <h3 className="profile-title">Mis reservas</h3>
      <ul className="flight-offer">
        {bookings.map((item) => {
          const date = formatDate(item);
          const iata = getIata(item);
          return (
            <li key={`RC_ID:${item.details.id}`}>
              <section className="booking-date">
                <p>{date[0]}</p>
                <p>{monthName(+date[1] - 1).toUpperCase()}</p>
                <p>{date[2]}</p>
              </section>
              <section className="booking-info" style={!item.vuelo_Vuelta ? css : null}>
                <p className="booking-iata">{iata[0]}</p>
                <div>
                  <p className="booking-id">{`ID:${item.details.id}`}</p>
                  <p className="booking-price">{`${item.details.total}€`}</p>
                </div>
                <p className="booking-iata">{iata[1]}</p>
              </section>
              {item.vuelo_Vuelta ? (
                <section className="booking-date">
                  <p>{date[3]}</p>
                  <p>{monthName(+date[4] - 1).toUpperCase()}</p>
                  <p>{date[5]}</p>
                </section>
              ) : null}
            </li>
          );
        })}
      </ul>
    </>
  );
};
