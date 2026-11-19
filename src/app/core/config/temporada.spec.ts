import { NOVENA, avisoTemporada, esDiaDeVelitas, temporadaActiva } from './temporada';

const dia = (a: number, m: number, d: number) => new Date(a, m - 1, d);

describe('avisoTemporada', () => {
  it('no se muestra fuera de la temporada', () => {
    expect(avisoTemporada(dia(2026, 11, 17))).toBeNull();
    expect(avisoTemporada(dia(2027, 1, 7))).toBeNull();
  });

  it('antes de la novena invita a seguirla', () => {
    expect(avisoTemporada(dia(2026, 12, 1))?.etiqueta).toBe('Novena de la salud');
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
  it('solo entre el 18 de noviembre y el 6 de enero', () => {
    expect(temporadaActiva(dia(2026, 11, 17))).toBe(false);
    expect(temporadaActiva(dia(2026, 11, 18))).toBe(true);
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
