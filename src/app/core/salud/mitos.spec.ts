import { MITOS_DATOS, barajar, mensajeFinal, nuevaRonda } from './mitos';

describe('mitos', () => {
  it('tiene frases completas y sin repetir', () => {
    expect(MITOS_DATOS.length).toBeGreaterThanOrEqual(30);
    const frases = new Set(MITOS_DATOS.map((m) => m.frase));
    expect(frases.size).toBe(MITOS_DATOS.length);
    MITOS_DATOS.forEach((m) => {
      expect(m.frase.length).toBeGreaterThan(10);
      expect(m.explicacion.length).toBeGreaterThan(10);
    });
  });

  it('baraja sin perder ni duplicar elementos', () => {
    let s = 1;
    const azar = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const r = barajar([1, 2, 3, 4, 5, 6], azar);
    expect([...r].sort()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('arma rondas de 5 preguntas distintas', () => {
    const r = nuevaRonda(5);
    expect(r.length).toBe(5);
    expect(new Set(r).size).toBe(5);
  });

  it('da un mensaje según los aciertos', () => {
    expect(mensajeFinal(5, 5)).toContain('Perfecto');
    expect(mensajeFinal(3, 5)).toContain('Muy bien');
    expect(mensajeFinal(1, 5)).toContain('Buen intento');
  });
});

describe('mitos: formato', () => {
  it('las frases no traen comillas ni barras sobrantes', () => {
    MITOS_DATOS.forEach((m) => expect(m.frase).not.toMatch(/["\\«»]/));
  });
});
