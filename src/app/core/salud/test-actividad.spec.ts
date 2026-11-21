import { PREGUNTAS, resultadoTest } from './test-actividad';

describe('test de actividad física', () => {
  it('tiene 5 preguntas con opciones', () => {
    expect(PREGUNTAS.length).toBe(5);
    PREGUNTAS.forEach((p) => expect(p.opciones.length).toBeGreaterThanOrEqual(2));
  });

  it('quien no se mueve recibe ánimo y los consejos básicos', () => {
    const r = resultadoTest([0, 0, 0, 2, 0]);
    expect(r.nivel).toBe('insuficiente');
    expect(r.titulo).toBe('Vas en camino');
    expect(r.consejos.length).toBe(3);
  });

  it('5 días de 30 min + fuerza 2 días cumple la meta sin consejos de más', () => {
    const r = resultadoTest([3, 0, 2, 0, 0]);
    expect(r.nivel).toBe('cumple');
    expect(r.fuerzaOk).toBe(true);
    expect(r.consejos[0]).toContain('Vas muy bien');
  });

  it('desde los 65 recuerda el equilibrio', () => {
    const r = resultadoTest([3, 2, 2, 0, 1]);
    expect(r.consejos.some((c) => c.includes('equilibrio'))).toBe(true);
  });

  it('la actividad intensa cuenta doble', () => {
    expect(resultadoTest([2, 2, 2, 0, 0]).nivel).toBe('cumple'); // 105 + 2×60 = 225
  });
});
