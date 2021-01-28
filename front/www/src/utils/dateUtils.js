const padNumber = (number) => `${number}`.padStart(2, '0');
export const formatDate = (date) => {
  console.log('date', date);
  const s = padNumber(date.getSeconds());
  const m = padNumber(date.getMinutes());
  const h = padNumber(date.getHours());
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = padNumber(date.getDate());
  return `${DD}-${MM}-${YYYY} ${h}:${m}:${s}`;
};
