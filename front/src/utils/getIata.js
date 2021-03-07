export const getIata = (response) => {
  const iata = [];

  const protoIataOrigen = response.vuelo_Ida.origen.split('(');
  iata.push(protoIataOrigen[1].substring(0, protoIataOrigen[1].length - 1));

  const protoIataDestino = response.vuelo_Ida.destino.split('(');
  iata.push(protoIataDestino[1].substring(0, protoIataDestino[1].length - 1));
  return iata;
};
