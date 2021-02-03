'use strict';
function setHeader(pdfData) {
  return `
    <header>
      <h3>Número de reserva: ${pdfData.bookingNumber}</h3>
      <p>Solicitada por: ${pdfData.user.email}</p>
      <p>Adultos: ${pdfData.adults}</p>
      <p>Importe total: ${pdfData.priceTotal} €</p>
    </header>`;
}
exports.setHeader = setHeader;
