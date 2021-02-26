export const getDuration = (item) => {
  const timetable = [];
  timetable.push(
    item.vuelo_Ida.duracion
      .substring(2)
      .substring(0, item.vuelo_Ida.duracion.substring(2).length - 1)
      .split('H')[0]
  );
  timetable.push(
    item.vuelo_Ida.duracion
      .substring(2)
      .substring(0, item.vuelo_Ida.duracion.substring(2).length - 1)
      .split('H')[1]
  );
  if (item.vuelo_Vuelta) {
    timetable.push(
      item.vuelo_Vuelta.duracion
        .substring(2)
        .substring(0, item.vuelo_Ida.duracion.substring(2).length - 1)
        .split('H')[0]
    );
    timetable.push(
      item.vuelo_Vuelta.duracion
        .substring(2)
        .substring(0, item.vuelo_Ida.duracion.substring(2).length - 1)
        .split('H')[1]
    );
  }

  return timetable;
};
