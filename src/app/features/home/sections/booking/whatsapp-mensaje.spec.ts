import { enlaceWhatsapp, mensajeCita } from './whatsapp-mensaje';

describe('mensaje de WhatsApp', () => {
  it('arma la solicitud con servicio, día y franja', () => {
    const m = mensajeCita({
      nombre: ' Ana Pérez ',
      servicio: 'Chequeo preventivo',
      dia: 'martes 3 de noviembre',
      rango: '3:00 – 7:00 p. m.',
      motivo: '',
    });
    expect(m).toBe(
      'Hola Dr. Patiño, soy Ana Pérez y quiero reservar una consulta.\n' +
        '• Servicio: Chequeo preventivo\n' +
        '• Día: martes 3 de noviembre (3:00 – 7:00 p. m.)\n' +
        '¿Qué hora tienen disponible?',
    );
  });

  it('incluye el motivo solo si lo escribieron', () => {
    const m = mensajeCita({
      nombre: 'Ana',
      servicio: null,
      dia: 'sábado 31 de octubre',
      rango: '9:00 a. m. – 12:00 m.',
      motivo: 'Dolor de rodilla',
    });
    expect(m).toContain('• Servicio: No estoy seguro');
    expect(m).toContain('• Motivo: Dolor de rodilla');
  });

  it('codifica el texto en el enlace', () => {
    expect(enlaceWhatsapp('573001234567', 'Hola Dr.\nCita')).toBe(
      'https://wa.me/573001234567?text=Hola%20Dr.%0ACita',
    );
  });
});
