export const padNumber = (number) => `${number}`.padStart(2, '0');

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

export const formatHeaderDate = (date) => {
  const seed = new Date(date);
  return `${seed.getDate()}${monthName(seed.getMonth())}`;
};

export const monthName = (number) => {
  switch (number) {
    case 0:
      return 'Ene';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Abr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Ago';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dic';
    default:
      return 'Ene';
  }
};
