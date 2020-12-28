'use strict';

const mysql = require('mysql2/promise');

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env;

let pool;

async function getPool() {
  if (!pool) {
    pool = await mysql.createPool({
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
    });
  }
  return pool;
}

module.exports = { getPool };
