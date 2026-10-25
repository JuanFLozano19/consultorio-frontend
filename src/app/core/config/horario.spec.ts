import {
  ahoraEnBogota,
  estadoConsultorio,
  festivosColombia,
  hora,
  proximosDias,
  rango,
} from './horario';

const enBogota = (isoUtc: string) => ahoraEnBogota(new Date(isoUtc));

describe('horario del consultorio', () => {
  it('calcula los festivos de Colombia 2026', () => {
    const f = festivosColombia(2026);
    for (const d of [
      '2026-01-12',
      '2026-03-23',
      '2026-04-02',
      '2026-04-03',
      '2026-05-18',
      '2026-06-08',
      '2026-06-15',
      '2026-06-29',
      '2026-08-17',
      '2026-10-12',
      '2026-11-02',
      '2026-11-16',
      '2026-12-08',
    ]) {
      expect(f.has(d)).toBe(true);
    }
    expect(f.size).toBe(18);
    expect(f.has('2026-01-06')).toBe(false);
  });

  it('formatea horas como en Colombia', () => {
    expect(hora('15:00')).toBe('3:00 p. m.');
    expect(hora('09:00')).toBe('9:00 a. m.');
    expect(hora('12:00')).toBe('12:00 m.');
    expect(rango({ desde: '15:00', hasta: '19:00' })).toBe('3:00 – 7:00 p. m.');
    expect(rango({ desde: '09:00', hasta: '12:00' })).toBe('9:00 a. m. – 12:00 m.');
  });

  it('usa la hora de Bogotá', () => {
    // 21:30 UTC = 4:30 p. m. en Bogotá, viernes 23 de octubre de 2026
    const a = enBogota('2026-10-23T21:30:00Z');
    expect(a.hoy.getDate()).toBe(23);
    expect(a.minutos).toBe(16 * 60 + 30);
  });

  it('dice si está abierto', () => {
    expect(estadoConsultorio(enBogota('2026-10-23T21:30:00Z'))).toEqual({
      abierto: true,
      texto: 'Abierto ahora · hasta las 7:00 p. m.',
    });
    expect(estadoConsultorio(enBogota('2026-10-23T15:00:00Z')).texto).toBe(
      'Cerrado · abre hoy a las 3:00 p. m.',
    );
    // sábado 24 a las 6 p. m. → domingo cerrado → abre el lunes 26
    expect(estadoConsultorio(enBogota('2026-10-24T23:00:00Z')).texto).toBe(
      'Cerrado · abre el lunes a las 3:00 p. m.',
    );
    // domingo 1 de noviembre → lunes 2 es festivo → abre el martes
    expect(estadoConsultorio(enBogota('2026-11-01T15:00:00Z')).texto).toBe(
      'Cerrado · abre el martes a las 3:00 p. m.',
    );
  });

  it('lista los próximos días sin domingos ni festivos', () => {
    // viernes 30 de octubre, 5 p. m.
    const dias = proximosDias(enBogota('2026-10-30T22:00:00Z'), 4);
    expect(dias.map((d) => d.iso)).toEqual([
      '2026-10-30',
      '2026-10-31',
      '2026-11-03',
      '2026-11-04',
    ]);
    expect(dias[0].etiqueta).toBe('Hoy');
    expect(dias[1]).toMatchObject({ etiqueta: 'Mañana', rango: '9:00 a. m. – 12:00 m.' });
    expect(dias[2].largo).toBe('martes 3 de noviembre');
  });

  it('no ofrece hoy si falta menos de una hora para cerrar', () => {
    const dias = proximosDias(enBogota('2026-10-30T23:30:00Z'), 1); // 6:30 p. m.
    expect(dias[0].iso).toBe('2026-10-31');
  });
});
