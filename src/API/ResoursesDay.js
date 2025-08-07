import dayjs from "dayjs";

const mismoDiaSemanaAnoPasado = (fecha) => {
  const actual = dayjs(fecha);
  const diaSemana = actual.day();
  const haceUnAnio = actual.subtract(1, 'year');
  for (let i = -3; i <= 3; i++) {
    const candidato = haceUnAnio.add(i, 'day');
    if (candidato.day() === diaSemana) {
      return candidato.format('YYYY-MM-DD');
    }
  }
  return haceUnAnio.format('YYYY-MM-DD');
}

export default {mismoDiaSemanaAnoPasado }
