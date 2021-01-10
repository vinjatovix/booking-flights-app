const { createPdfData } = require('./createPdfData');
const { storePdf } = require('./storePdf');
const fs = require('fs').promises;
const { sendBookingMail } = require('./sendBookingMail');
const { deleteFile } = require('../utils/deleteFile');

async function sendBookingPDF(bookingCache, req, next) {
  try {
    const pdfData = createPdfData(bookingCache, req);
    const storePath = await storePdf(pdfData, req, next);
    const file = (await fs.readFile(storePath.filename)).toString('base64');
    await sendBookingMail(file, req, next);
    await deleteFile(storePath.filename);
  } catch (err) {
    err.details = err.message;
    next(err);
  }
}

module.exports = { sendBookingPDF };
