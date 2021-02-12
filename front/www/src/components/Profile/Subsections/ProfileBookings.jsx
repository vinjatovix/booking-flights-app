import React, { useState, useEffect } from 'react';

import '../profile.css';

export const ProfileBookings = ({ dispatch, profile_bookings }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {}, [bookings]);
  return (
    <>
      <h4>Mis reservas</h4>
    </>
  );
};

// //       <ul>
//         {props.items.map((item) => {
//           return <li>{item}</li>;
//         })}
//       </ul>
