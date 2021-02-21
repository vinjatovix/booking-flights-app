import React, { useState, useEffect } from 'react';
import { formatDate, monthName, formatHour } from '../../../utils/dateUtils';
import { ErrorMessage } from '../../../components/common/ErrorMessage';
import { getIata } from '../../../utils/getIata';
import { getDuration } from '../../../utils/getDuration';
import { GetBooking } from '../../Modal/modaldata/modalBooking';
import * as A from '../../../context/auth/Auth.actions';
import '../profile.css';

export const ProfileBookings = ({ dispatch, profile_bookings, modal }) => {
  const [bookings, setBookings] = useState([]);
  const [css, setCss] = useState('arrow-logo');
  const token = JSON.parse(localStorage.getItem('token'));

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
  }, [token]);

  return (
    <>
      <h4 className="profile-title">Mis reservas</h4>
      <ul className="profile-bookings">
        {bookings.ok === false ? (
          <ErrorMessage>{bookings.details}</ErrorMessage>
        ) : (
          bookings.map((item) => {
            const date = formatDate(item);
            const iata = getIata(item);
            const timetable = formatHour(item);
            const duration = getDuration(item);
            return (
              <li
                className="profile-bookings__item"
                key={`RC_ID:${item.details.id}`}
                onClick={() => {
                  dispatch(
                    A.changeModalData({
                      modal_data: <GetBooking props={{ dispatch, modal, item, iata, date, timetable, duration }} />,
                    })
                  );
                  dispatch(A.switchBoolean({ name: 'modal', value: modal }));
                }}
              >
                <section className="profile-bookings__item-time">
                  <p>{date[0]}</p>
                  <p>{monthName(+date[1] - 1).toUpperCase()}</p>
                  <p>{date[2]}</p>
                </section>
                <section className="profile-bookings__item-data">
                  <h5>{`ID:${item.details.id}`}</h5>
                  <div className="profile-bookings__item-data__center">
                    <h2>{iata[0]}</h2>
                    <div className={item.vuelo_Vuelta ? 'double-arrow-logo' : 'arrow-logo'}></div>
                    <h2>{iata[1]}</h2>
                  </div>
                  <h4>{`${item.details.total}€`}</h4>
                </section>
                {item.vuelo_Vuelta ? (
                  <section className="profile-bookings__item-time">
                    <p>{date[6]}</p>
                    <p>{monthName(+date[4] - 1).toUpperCase()}</p>
                    <p>{date[8]}</p>
                  </section>
                ) : null}
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};

// {/* <section className="booking-date">
//                   <p>{date[0]}</p>
//                   <p>{monthName(+date[1] - 1).toUpperCase()}</p>
//                   <p>{date[2]}</p>
//                 </section>
//                 <section className="booking-info" style={!item.vuelo_Vuelta ? css : null}>
//                   <p className="booking-iata">{iata[0]}</p>
//                   <div>
//                     <p className="booking-id">{`ID:${item.details.id}`}</p>
//                     <p className="booking-price">{`${item.details.total}€`}</p>
//                   </div>
//                   <p className="booking-iata">{iata[1]}</p>
//                 </section>
//                 {item.vuelo_Vuelta ? (
//                   <section className="booking-date">
//                     <p>{date[6]}</p>
//                     <p>{monthName(+date[4] - 1).toUpperCase()}</p>
//                     <p>{date[8]}</p>
//                   </section>
//                 ) : null} */}
