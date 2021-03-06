'use strict';

const { fillTemplate } = require('./fillTemplate');
const path = require('path');
const puppeteer = require('puppeteer');

async function storePdf(pdfData, req, next) {
  try {
    const browser = await puppeteer.launch();
    const page = browser.newPage();

    const html = fillTemplate(pdfData);
    await (await page).setContent(html);

    const filePath = path.join(__dirname, `../../tmp/${req.auth.id}-${Date.now()}.pdf`);

    await (await page).pdf({
      path: filePath,
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return filePath;
  } catch (err) {
    err.details = err.message;
    next(err);
  }
}
module.exports = { storePdf };
