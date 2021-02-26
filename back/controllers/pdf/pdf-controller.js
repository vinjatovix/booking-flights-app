'use strict';

const { deleteFile } = require('../utils/deleteFile');
const fs = require('fs').promises;
const { sendBookingMail } = require('./sendBookingMail');
const { storePdf } = require('./storePdf');

async function sendBookingPDF(bookingCache, req, next) {
  try {
    const storePath = await storePdf(bookingCache, req, next);
    const file = (await fs.readFile(storePath)).toString('base64');
    await sendBookingMail(file, req, next);
    await deleteFile(storePath);
    return true;
  } catch (err) {
    err.details = err.message;
    next(err);
  }
}

module.exports = { sendBookingPDF };
