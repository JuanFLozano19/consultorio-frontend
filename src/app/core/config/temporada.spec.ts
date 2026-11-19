import { NOVENA, avisoTemporada, esDiaDeVelitas, temporadaActiva } from './temporada';

const dia = (a: number, m: number, d: number) => new Date(a, m - 1, d);

describe('avisoTemporada', () => {
  it('no se muestra fuera de la temporada', () => {
    expect(avisoTemporada(dia(2026, 11, 30))).toBeNull();
    expect(avisoTemporada(dia(2027, 1, 7))).toBeNull();
  });

  it('antes de la novena no hay aviso (salvo el Día de Velitas)', () => {
    expect(avisoTemporada(dia(2026, 12, 2))).toBeNull();
    expect(avisoTemporada(dia(2026, 12, 15))).toBeNull();
    expect(avisoTemporada(dia(2026, 12, 16))?.etiqueta).toContain('Día 1');
  });

  it('durante la novena muestra el consejo del día', () => {
    const a = avisoTemporada(dia(2026, 12, 18));
    expect(a?.etiqueta).toContain('Día 3');
    expect(a?.texto).toBe(NOVENA[2]);
    expect(avisoTemporada(dia(2026, 12, 24))?.texto).toBe(NOVENA[8]);
  });

  it('cambia en Navidad, fin de año y año nuevo', () => {
    expect(avisoTemporada(dia(2026, 12, 25))?.etiqueta).toBe('¡Feliz Navidad!');
    expect(avisoTemporada(dia(2026, 12, 31))?.texto).toContain('pólvora');
    const enero = avisoTemporada(dia(2027, 1, 3));
    expect(enero?.etiqueta).toBe('¡Feliz 2027!');
    expect(enero?.accion?.destino).toBe('whatsapp');
  });

  it('cada mensaje tiene su propia clave para recordar si se cerró', () => {
    expect(avisoTemporada(dia(2026, 12, 16))?.clave).not.toBe(
      avisoTemporada(dia(2026, 12, 17))?.clave,
    );
  });
});

describe('temporadaActiva', () => {
  it('solo entre el 1 de diciembre y el 6 de enero', () => {
    expect(temporadaActiva(dia(2026, 11, 30))).toBe(false);
    expect(temporadaActiva(dia(2026, 12, 1))).toBe(true);
    expect(temporadaActiva(dia(2027, 1, 6))).toBe(true);
    expect(temporadaActiva(dia(2027, 1, 7))).toBe(false);
  });
});

describe('Día de Velitas', () => {
  it('el 7 de diciembre muestra el aviso de velitas', () => {
    expect(esDiaDeVelitas(dia(2026, 12, 7))).toBe(true);
    expect(esDiaDeVelitas(dia(2026, 12, 8))).toBe(false);
    const a = avisoTemporada(dia(2026, 12, 7));
    expect(a?.etiqueta).toBe('Noche de velitas');
    expect(a?.icono).toBe('vela');
  });
});

describe('fechas especiales con hora', () => {
  const h = (hh: number, mm = 0) => hh * 60 + mm;

  it('la cuenta regresiva se escribe bonito', async () => {
    const { faltaParaMedianoche } = await import('./temporada');
    expect(faltaParaMedianoche(h(20, 40))).toBe('3 h 20 min');
    expect(faltaParaMedianoche(h(23, 15))).toBe('45 min');
    expect(faltaParaMedianoche(h(22))).toBe('2 h');
    expect(faltaParaMedianoche(h(23, 59) + 0.5)).toBe('menos de 1 min');
  });

  it('el 24 es novena de día y Nochebuena desde las 6 p. m.', async () => {
    const { escenaTemporada } = await import('./temporada');
    expect(escenaTemporada(dia(2026, 12, 24), h(10))?.tipo).toBe('novena');
    const e = escenaTemporada(dia(2026, 12, 24), h(21, 30));
    expect(e?.tipo).toBe('nochebuena');
    expect(avisoTemporada(dia(2026, 12, 24), h(21, 30))?.texto).toContain('2 h 30 min');
  });

  it('a la medianoche del 24 llega la Navidad', async () => {
    const { escenaTemporada } = await import('./temporada');
    expect(escenaTemporada(dia(2026, 12, 25), 0)?.tipo).toBe('navidad');
  });

  it('el 31 es noche vieja con cuenta regresiva al año siguiente', async () => {
    const { escenaTemporada } = await import('./temporada');
    const e = escenaTemporada(dia(2026, 12, 31), h(23, 50));
    expect(e).toEqual({ tipo: 'nochevieja', faltan: '10 min', anio: 2027 });
    expect(avisoTemporada(dia(2026, 12, 31), h(23, 50))?.texto).toContain('para 2027');
  });

  it('el 1 de enero es año nuevo y el 2 ya no hay escena', async () => {
    const { escenaTemporada } = await import('./temporada');
    expect(escenaTemporada(dia(2027, 1, 1), 1)).toEqual({ tipo: 'anonuevo', anio: 2027 });
    expect(escenaTemporada(dia(2027, 1, 2), 1)).toBeNull();
  });

  it('la novena enciende una estrella por día', async () => {
    const { escenaTemporada } = await import('./temporada');
    expect(escenaTemporada(dia(2026, 12, 16))).toMatchObject({ tipo: 'novena', dia: 1 });
    expect(escenaTemporada(dia(2026, 12, 20))).toMatchObject({ tipo: 'novena', dia: 5 });
  });
});
