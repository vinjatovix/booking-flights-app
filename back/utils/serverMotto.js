"use strict";

process.title = process.env.BENDER_TITLE || "backEnd-server"; //? Esto le da un nombre al proceso dentro del sistema

/**
 *
 *
 * @param {Number} HOST
 * @param {String} PORT
 * @return {callback}
 */
function serverMotto(HOST, PORT) {
  return () => {
    console.log(
      `PID:${process.pid} named ${process.title} listening on http://${HOST}:${PORT}`
    );
  };
}

module.exports = { serverMotto };
