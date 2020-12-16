"use strict";

//? IMPORTS
require("dotenv").config();
const express = require("express");

//? SETUP
const HOST = process.env.BENDER_HOST || "localhost";
exports.HOST = HOST;
const PORT = process.env.BENDER_PORT || 8081;
exports.PORT = PORT;
process.title = process.env.BENDER_TITLE || "backEnd-server";

//? APP
const app = express();

// TODO: MIDDLEWARES

//? ROUTES
app.get("/", (req, res) => {
  res.status(200).send({
    title: "LO (&& behold ^^)",
    message: "Route / is working properly",
  });
});

//? LISTEN
app.listen(PORT, () => {
  console.log(
    `PID:${process.pid} named ${process.title} listening on http://${HOST}:${PORT}`
  );
});
