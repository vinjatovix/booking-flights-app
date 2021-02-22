import React, { useEffect } from 'react';

/* CONTEXT */
import { useFlightContext } from '../context/flight/Flight.context';

/* COMPONENTS */
import { SearchForm } from '../components/SearchFlight/SearchForm/SearchForm';
import { CustomModal } from '../components/Modal/Modal';
import { Booking } from '../components/SearchFlight/Booking/Booking';
import { Response } from '../components/SearchFlight/Response';
import { useAuthContext } from '../context/auth/Auth.context';

export const SearchPage = ({ endPoint, title }) => {
  const [{ menu }] = useAuthContext();
  const [{ response, searching, booking, bookingCache }] = useFlightContext();
  useEffect(() => {}, [response, menu, booking]);

  const searchFormProps = {
    endPoint,
    searching,
    title,
  };

  return (
    <>
      {!searching && <SearchForm {...searchFormProps} />}
      {response.adults && <Response />}
      {booking && <CustomModal>{bookingCache && <Booking />}</CustomModal>}
    </>
  );
};
