export const padNumber = (number) => `${number}`.padStart(2, '0');

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

// TODO: Revisar para reducir a menos líneas con New Date
export const formatDate = (string) => {
  const date = [];
  date.push(string.vuelo_Ida.salida.split('T')[0].split('-')[2]);
  date.push(string.vuelo_Ida.salida.split('T')[0].split('-')[1]);
  date.push(string.vuelo_Ida.salida.split('T')[0].split('-')[0]);

  if (string.vuelo_Vuelta) {
    date.push(string.vuelo_Vuelta.salida.split('T')[0].split('-')[2]);
    date.push(string.vuelo_Vuelta.salida.split('T')[0].split('-')[1]);
    date.push(string.vuelo_Vuelta.salida.split('T')[0].split('-')[0]);
  }
  return date;
};
