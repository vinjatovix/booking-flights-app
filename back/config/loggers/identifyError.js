'use strict';
function identifyError(err) {
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
    err.details = err.details.replace('"email" is not allowed to be empty', 'El email no puede estar vacío.');
    err.details = err.details.replace('"password" is not allowed to be empty', 'La contraseña no puede estar vacía.');
  }
  if (err.code === 'EAI_AGAIN') {
    err.message = `${process.env.DATABASE_HOST} is'n a known host.`;
    err.code = 400;
  }
  if (err.code === 'ECONNREFUSED') {
    err.message = `La conexion con el puerto ${process.env.DATABASE_PORT} ha sido rechazada. Por favor, comprueba los ajustes.`;
    err.code = 400;
  }
  if (err.code === 'ER_BAD_DB_ERROR') {
    err.message = `¿Estás seguro de que '${process.env.DATABASE_NAME}' es el nombre correcto de la base?`;
    err.code = 400;
  }
  if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    err.message = 'Acceso denegado';
    err.code = 401;
  }
  err.ok = err.ok || false;
  err.code = err.code || 500;
  err.details = err.details || 'Error desconocido...';
}
exports.identifyError = identifyError;
