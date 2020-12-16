"use strict";

//? IMPORTS
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

//? SETUP
const HOST = process.env.BENDER_HOST || "localhost";
exports.HOST = HOST;
const PORT = process.env.BENDER_PORT || 8081;
exports.PORT = PORT;
process.title = process.env.BENDER_TITLE || "backEnd-server";

//? APP
const app = express();
exports.app = app;
const accessLogStream = fs.createWriteStream("./logs/acces.log", {
  flags: "a",
});

// TODO: MIDDLEWARES
app.use(morgan("combined", { inmediate: true, stream: accessLogStream }));

//? ROUTES
app.get("/", (req, res) => {
  res.status(200).send({
    title: "LO (&& behold ^^)",
    message: "Route / is working properly",
  });
});
app.get("*", (req, res) => {
  res.status(404).send({ error: "URL not found" });
});

//? LISTEN
app.listen(PORT, () => {
  console.log(
    `PID:${process.pid} named ${process.title} listening on http://${HOST}:${PORT}`
  );
});
