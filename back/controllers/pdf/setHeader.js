'use strict';
function setHeader(pdfData) {
  return `
  
  <header class="booking-header">
  <h1>FL</h1>
  <small>0.6</small>
  <p class="booking-header__ID">
  Número de reserva: ${pdfData.header.RC_ID}</p>
  <p class="booking-header__mail">Solicitada por: ${pdfData.header.email}</p>
</header>

`;
}
exports.setHeader = setHeader;
