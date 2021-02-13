import React, { useState, useEffect } from 'react';

import '../profile.css';

export const ProfileBookings = ({ dispatch, profile_bookings }) => {
  const [bookings, setBookings] = useState([]);
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
      console.log(json);
    }
    getBookings();
  }, [bookings]);
  return (
    <>
      <h4>Mis reservas</h4>
      <ul className="flight-offer">
        <li></li>
      </ul>
    </>
  );
};

// //       <ul>
//         {props.items.map((item) => {
//           return <li>{item}</li>;
//         })}
//       </ul>
