import { enlaceWhatsapp, fechaLegible, mensajeCita } from './whatsapp-mensaje';

describe('mensaje de WhatsApp', () => {
  it('escribe la fecha en español', () => {
    expect(fechaLegible('2026-10-23')).toBe('viernes 23 de octubre');
  });

  it('arma el mensaje con los datos de la cita', () => {
    const m = mensajeCita({ nombre: ' Ana Pérez ', servicio: 'Chequeo preventivo', fecha: '2026-10-24', franja: 'TARDE', motivo: '' });
    expect(m).toBe(
      'Hola Dr. Patiño, soy Ana Pérez y quiero reservar una consulta.\n' +
        '• Servicio: Chequeo preventivo\n' +
        '• Fecha preferida: sábado 24 de octubre, en la tarde',
    );
  });

  it('incluye el motivo solo si lo escribieron', () => {
    const m = mensajeCita({ nombre: 'Ana', servicio: null, fecha: '2026-10-26', franja: 'MANANA', motivo: 'Dolor de rodilla' });
    expect(m).toContain('• Servicio: No estoy seguro');
    expect(m).toContain('• Motivo: Dolor de rodilla');
  });

  it('codifica el texto en el enlace', () => {
    expect(enlaceWhatsapp('573001234567', 'Hola Dr.\nCita')).toBe('https://wa.me/573001234567?text=Hola%20Dr.%0ACita');
  });
});
