'use strict';

function identifyError(err) {
  //? JOI ERRORS
  if (err.name === 'ValidationError') {
    err.code = 400;
    err.details = err.details[0].message;

    err.details = err.details.replace(
      '"password" length must be at least 6 characters long',
      'Longitud mínima de contraseña 6'
    );
    err.details = err.details.replace('"repeatPassword" must be [ref:password]', 'Las contraseñas no coinciden');
    err.details = err.details.replace(
      '"username" length must be at least 5 characters long',
      'Longitud mínima de usuario 5'
    );
    err.details = err.details.replace('"email" must be a valid email', 'El mail no es válido');
    err.details = err.details.replace('"email" is not allowed to be empty', 'El email no puede estar vacío.');
    err.details = err.details.replace('"password" is not allowed to be empty', 'La contraseña no puede estar vacía.');
    err.details = err.details.replace(
      '"adults" must be less than or equal to 9',
      'Los adultos no pueden ser más de 9.'
    );
    err.details = err.details.replace(
      '"repeatNewPassword" must be [ref:newPassword]',
      'Las contraseñas nuevas no coinciden'
    );
    err.details = err.details.replace(
      '"newPassword" length must be at least 6 characters long',
      'La longitud mínima de la contraseña es de 6 caracteres'
    );
  }

  //? DATABASE ERRORS
  if (err.code === 'EAI_AGAIN') {
    err.code = 400;
    err.details = `${process.env.DATABASE_HOST} isn't a known host.`;
  }
  if (err.code === 'ECONNREFUSED') {
    err.code = 400;
    err.details = `La conexion con el puerto ${process.env.DATABASE_PORT} ha sido rechazada. Por favor, comprueba los ajustes.`;
  }
  if (err.code === 'ER_BAD_DB_ERROR') {
    err.code = 400;
    err.details = `¿Estás seguro de que '${process.env.DATABASE_NAME}' es el nombre correcto de la base?`;
  }
  if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    err.code = 401;
    err.details = 'Acceso denegado';
  }

  //? UPLOAD ERRORS
  if (err.message === 'Input file is missing') {
    err.code = 400;
    err.details = 'El archivo está vacío';
  }

  //? AMADEUS REQUEST ERRORS
  if (err.code === 'BADADULTS') {
    err.code = 400;
    err.details = 'El número de adultos debe de ser entre 1 y 9';
  }
  if (err.code === 'NOID') {
    err.code = 401;
    err.details = 'Se necesita el ID de usuario';
  }
  if (err.code === 'BADFLIGHT') {
    err.code = 400;
    err.details = 'Los datos de vuelo no son válidos';
  }
  if (err.code === 'BADITINERARY') {
    err.code = 400;
    err.details = 'Los datos de itinerario no son válidos';
  }

  //? UNKNOWN ERRORS
  err.ok = false;
  err.code = err.code || 500;
  err.details = err.details || 'Error desconocido...';
}
exports.identifyError = identifyError;
