import { calcularImc, calcularZonasFc, evaluarActividad } from './calculos';

describe('calcularImc', () => {
  it('calcula el valor y la categoría según la OMS', () => {
    expect(calcularImc(70, 175)).toMatchObject({ valor: 22.9, categoria: 'normal' });
    expect(calcularImc(50, 175)?.categoria).toBe('bajo');
    expect(calcularImc(80, 175)?.categoria).toBe('sobrepeso');
    expect(calcularImc(95, 175)?.categoria).toBe('obesidad');
  });

  it('da el rango de peso saludable para la estatura', () => {
    expect(calcularImc(70, 175)?.pesoSano).toEqual([56.7, 76.3]);
  });

  it('rechaza datos fuera de rango', () => {
    expect(calcularImc(0, 175)).toBeNull();
    expect(calcularImc(70, 50)).toBeNull();
  });
});

describe('calcularZonasFc', () => {
  it('usa Tanaka sin pulso en reposo', () => {
    const r = calcularZonasFc(30)!;
    expect(r.fcMax).toBe(187);
    expect(r.metodo).toBe('tanaka');
    expect(r.zonas[0]).toMatchObject({ min: 94, max: 112 });
    expect(r.zonas[4].max).toBe(187);
  });

  it('usa Karvonen con pulso en reposo', () => {
    const r = calcularZonasFc(30, 60)!;
    expect(r.metodo).toBe('karvonen');
    // reserva 127: 60 + 127 × 0,5 = 123,5 → 124
    expect(r.zonas[0].min).toBe(124);
    expect(r.zonas[4].max).toBe(187);
  });

  it('rechaza edades fuera de rango', () => {
    expect(calcularZonasFc(5)).toBeNull();
  });
});

describe('evaluarActividad', () => {
  it('cuenta 1 minuto vigoroso como 2 moderados', () => {
    expect(evaluarActividad(60, 30, 0).equivalentes).toBe(120);
  });

  it('clasifica según la meta de 150 y 300 minutos', () => {
    expect(evaluarActividad(100, 0, 0).nivel).toBe('insuficiente');
    expect(evaluarActividad(150, 0, 2).nivel).toBe('cumple');
    expect(evaluarActividad(150, 0, 2).fuerzaOk).toBe(true);
    expect(evaluarActividad(200, 60, 1)).toMatchObject({ nivel: 'optimo', fuerzaOk: false });
  });

  it('indica cuántos minutos faltan', () => {
    expect(evaluarActividad(100, 0, 0).mensaje).toContain('50 minutos moderados');
  });
});
