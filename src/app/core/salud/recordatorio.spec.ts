import { archivoIcs, enlaceGoogleCalendar, fechaEnMeses } from './recordatorio';

const datos = {
  titulo: 'Chequeo preventivo',
  detalle: 'Agenda: wa.me/57',
  lugar: 'Cra 18 # 80-74, Bogotá',
};

describe('recordatorio de chequeo', () => {
  it('suma meses sin pasarse del último día del mes', () => {
    expect(fechaEnMeses(new Date(2026, 10, 20), 6)).toEqual(new Date(2027, 4, 20));
    expect(fechaEnMeses(new Date(2026, 7, 31), 6)).toEqual(new Date(2027, 1, 28));
    expect(fechaEnMeses(new Date(2026, 10, 20), 12)).toEqual(new Date(2027, 10, 20));
  });

  it('arma el enlace de Google Calendar como evento de todo el día', () => {
    const u = new URL(enlaceGoogleCalendar(new Date(2027, 4, 20), datos));
    expect(u.hostname).toBe('calendar.google.com');
    expect(u.searchParams.get('dates')).toBe('20270520/20270521');
    expect(u.searchParams.get('text')).toBe('Chequeo preventivo');
  });

  it('arma un .ics válido con aviso un día antes', () => {
    const ics = archivoIcs(new Date(2027, 4, 20), datos, new Date('2026-11-21T04:00:00Z'));
    expect(ics).toContain('DTSTART;VALUE=DATE:20270520');
    expect(ics).toContain('TRIGGER:-P1D');
    expect(ics).toContain('LOCATION:Cra 18 # 80-74\\, Bogotá');
    expect(ics.split('\r\n')[0]).toBe('BEGIN:VCALENDAR');
  });
});
