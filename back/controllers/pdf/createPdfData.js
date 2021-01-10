const { detailsToPdfCache } = require('./detailsToPdfCache');

function createPdfData(bookingCache, req) {
  let travel = { direction: [] };

  travel.direction.push(detailsToPdfCache('ida', bookingCache, travel));
  if (req.body.itineraries[1]) {
    travel.direction.push(detailsToPdfCache('vuelta', bookingCache, travel));
  }

  const { email, username } = req.auth;
  const { RC_ID: bookingNumber, RC_adults: adults, RC_base: priceBase, RC_total: priceTotal } = bookingCache.header;

  const pdfData = {
    user: { username, email },
    bookingNumber,
    adults,
    priceBase,
    priceTotal,
    travel,
  };
  return pdfData;
}
exports.createPdfData = createPdfData;
