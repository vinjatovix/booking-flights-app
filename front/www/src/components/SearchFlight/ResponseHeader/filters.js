const formatDuration = (string) => {
  return +string.replace(/PT(\d+)H(\d+)M/, '$1.$2');
};

export const byPrice = (a, b) => (+a.price.grandTotal < +b.price.grandTotal ? 1 : -1);

export const byStops = (a, b) => {
  const paradasA = a.itineraries[0].segments.length;
  const paradasB = b.itineraries[0].segments.length;
  return a.itineraries[0].segments.length > b.itineraries[0].segments.length ? -1 : 1;
};

export const byDuration = (a, b) => {
  const durA = formatDuration(a.itineraries[0].duration);
  const durB = formatDuration(b.itineraries[0].duration);
  return +durA - +durB;
};
