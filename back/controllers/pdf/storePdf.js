const path = require('path');
const fs = require('fs').promises;
const pdf = require('pdf-creator-node');

async function readFileAsync(path) {
  return await fs.readFile(path, 'utf-8');
}

async function storePdf(pdfData, req, next) {
  try {
    const html = await readFileAsync(path.join(__dirname, '/template.html'), next);
    const filePath = path.join(__dirname, `../../tmp/${req.auth.id}-${Date.now()}.pdf`);
    const document = {
      html: html,
      data: {
        pdfData,
      },
      path: filePath,
    };
    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '1rem',
    };
    const pdfPath = await pdf.create(document, options).then((res) => {
      return res;
    });
    return pdfPath;
  } catch (err) {
    err.details = err.message;
    next(err);
  }
}
module.exports = { storePdf };
