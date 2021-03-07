import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { AirportSelector } from "./AirportSelector";
import { Article } from "../../common/Article/Article";
import { Dates } from "../ResponseHeader/SearchForm/Dates";
import { ErrorMessage } from "../../common/ErrorMessage";
import { Input } from "../../common/Input";
import { Loading } from "../../common/Loading/Loading";
import { PassengerCounter } from "./PassengerCounter";

import * as F from "../../../context/flight/Flight.actions";
import { resetReturnDate } from "./resetReturnDate";
import { makeSearch } from "../../../http/api";

import "./searchForm.css";

export const SearchForm = ({
  title,
  adults,
  departureDate,
  destinationLocationCode,
  dispatch,
  loading,
  nonStop,
  oneWay,
  originLocationCode,
  returnDate,
  searching,
  menu,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [css, setCss] = useState("radius focus");
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    menu ? setCss("radius blur") : setCss("radius focus");
  }, [menu]);

  useEffect(() => {
    loading
      ? setCss((c) => c.trim() + " Loading")
      : setCss((c) => c.replace("Loading", ""));
  }, [loading]);

  useEffect(() => {}, [searching]);

  const { register, handleSubmit } = useForm();

  const tripValue = oneWay ? "Solo ida" : "I/V";
  const stopsValue = nonStop ? "Directo" : "Todos";

  const tripProps = {
    r: register,
    className: "SearchForm__trip radius",
    type: "button",
    name: "oneWay",
    id: "trip",
    value: tripValue,
    onClick: resetReturnDate(dispatch, oneWay),
  };
  const passengerProps = {
    r: register,
    dispatch: dispatch,
    adults: adults,
  };
  const nonStopProps = {
    r: register,
    className: "SearchForm__nonStop radius",
    type: "button",
    name: "nonStop",
    id: "escales",
    value: stopsValue,
    onClick: () =>
      dispatch(F.switchBoolean({ name: "nonStop", value: nonStop })),
  };
  const priceProps = {
    r: register,
    className: "SearchForm__price radius",
    type: "number",
    name: "maxPrice",
    id: "price",
    placeholder: "Max €",
    handler: (e) =>
      dispatch(F.setNumber({ name: "maxPrice", value: e.target.value })),
  };
  const originAirportProps = {
    r: register,
    placeholder: "Compostela",
    name: "originLocationCode",
    value: originLocationCode,
    dispatch: dispatch,
  };
  const destinationAirportProps = {
    r: register,
    placeholder: "London",
    name: "destinationLocationCode",
    value: destinationLocationCode,
    dispatch: dispatch,
  };
  const datesProps = {
    r: register,
    className: "SearchForm__dates",
    departureDate: departureDate,
    returnDate: returnDate,
    dispatch: dispatch,
    oneWay: oneWay,
  };

  const onSubmit = async (data) => {
    await makeSearch(data, {
      dispatch,
      isMounted,
      loading,
      searching,
      setErrorMessage,
    });
  };

  return (
    <Article title={title} className={css}>
      <form
        className="SearchForm "
        method="GET"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...tripProps} />
        <PassengerCounter {...passengerProps} />
        <Input {...nonStopProps} />
        <Input {...priceProps} />
        <AirportSelector {...originAirportProps} />
        <AirportSelector {...destinationAirportProps} />
        <Dates {...datesProps} />

        {!searching && !loading ? (
          <Input
            className="radius"
            id="submit-button"
            type="submit"
            value="Buscar"
          />
        ) : (
          <Loading />
        )}
      </form>
      <ErrorMessage children={errorMessage} />
    </Article>
  );
};
