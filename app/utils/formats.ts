export function dateFormat(date: any): string {
  // Extraer día, mes y año
  const dia = date.getDate();
  const mes = date.getMonth() + 1; // Los meses en JavaScript son base 0
  const año = date.getFullYear();

  // Formatear la fecha con ceros a la izquierda si es necesario
  const diaFormateado = dia < 10 ? "0" + dia : dia;
  const mesFormateado = mes < 10 ? "0" + mes : mes;

  // Crear la cadena de fecha formateada
  return `${diaFormateado}-${mesFormateado}-${año}`;
}

export function hourFormat(fechaString: any): string {
  // Crear un objeto Date a partir de la cadena de fecha
  const fecha = new Date(fechaString);

  // Obtener la hora, los minutos y la indicación de AM/PM
  let hora = fecha.getHours();
  const minutos = fecha.getMinutes();
  const ampm = hora >= 12 ? "PM" : "AM";

  // Convertir la hora al formato de 12 horas
  hora = hora % 12;
  hora = hora ? hora : 12; // Si la hora es 0, la convertimos a 12 en lugar de 0

  // Formatear la hora con ceros a la izquierda si es necesario
  const horaFormateada = hora < 10 ? "0" + hora : hora;

  // Crear la cadena de hora formateada
  const horaCompleta = `${horaFormateada}:${
    minutos < 10 ? "0" + minutos : minutos
  } ${ampm}`;

  return horaCompleta;
}
