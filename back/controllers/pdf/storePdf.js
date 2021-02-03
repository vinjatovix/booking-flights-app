'use strict';

const path = require('path');
const puppeteer = require('puppeteer');
const { fillTemplate } = require("./fillTemplate");
const { setDirection } = require("./setDirection");
const { setHeader } = require("./setHeader");

async function storePdf(pdfData, req, next) {
  try {
    const browser = await puppeteer.launch();
    const page = browser.newPage();

    const header = setHeader(pdfData);
    const ida = setDirection(pdfData, 'ida');
    const vuelta = setDirection(pdfData, 'vuelta');

    const html = fillTemplate(header, ida, vuelta);
    await (await page).setContent(html); //TODO: WTF???
    const filePath = path.join(__dirname, `../../tmp/${req.auth.id}-${Date.now()}.pdf`);
    await (await page).pdf({
      path: filePath,
    });
    await browser.close();
    return filePath;
  } catch (err) {
    err.details = err.message;
    next(err);
  }
}
module.exports = { storePdf };

