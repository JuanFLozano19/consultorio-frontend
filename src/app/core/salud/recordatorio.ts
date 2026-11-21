/**
 * Recordatorio del próximo chequeo en el calendario de la persona.
 * No se guarda nada en servidores: se arma un enlace de Google Calendar o un archivo .ics
 * que la persona agrega a su propio calendario.
 */
export interface DatosRecordatorio {
  titulo: string;
  detalle: string;
  lugar: string;
}

/** Fecha dentro de `meses` meses (si el día no existe, p. ej. 31 de febrero, usa el último del mes). */
export function fechaEnMeses(desde: Date, meses: number): Date {
  const d = new Date(desde.getFullYear(), desde.getMonth() + meses, 1);
  const ultimo = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(desde.getDate(), ultimo));
  return d;
}

const aaaammdd = (d: Date) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;

const diaSiguiente = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

/** Enlace para crear el evento (de todo el día) en Google Calendar. */
export function enlaceGoogleCalendar(fecha: Date, datos: DatosRecordatorio): string {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: datos.titulo,
    dates: `${aaaammdd(fecha)}/${aaaammdd(diaSiguiente(fecha))}`,
    details: datos.detalle,
    location: datos.lugar,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

const escapar = (t: string) =>
  t.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

/** Archivo .ics (calendario del iPhone, Outlook, Android) con aviso un día antes. */
export function archivoIcs(fecha: Date, datos: DatosRecordatorio, ahora = new Date()): string {
  const sello = ahora
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dr. Jeison Patino//Recordatorio//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:chequeo-${aaaammdd(fecha)}-${sello}@dr-jeison-patino`,
    `DTSTAMP:${sello}`,
    `DTSTART;VALUE=DATE:${aaaammdd(fecha)}`,
    `DTEND;VALUE=DATE:${aaaammdd(diaSiguiente(fecha))}`,
    `SUMMARY:${escapar(datos.titulo)}`,
    `DESCRIPTION:${escapar(datos.detalle)}`,
    `LOCATION:${escapar(datos.lugar)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapar(datos.titulo)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/** «18 de mayo de 2027» */
export function fechaLarga(d: Date): string {
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
}
