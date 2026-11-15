/**
 * Cálculos de las herramientas de salud. Son orientativos y no reemplazan la consulta médica.
 * Referencias:
 *  - IMC y categorías para adultos: Organización Mundial de la Salud (OMS).
 *  - Frecuencia cardíaca máxima: fórmula de Tanaka (208 − 0,7 × edad).
 *  - Zonas con pulso en reposo: método de Karvonen (reserva de frecuencia cardíaca).
 *  - Actividad física para adultos: Directrices de la OMS 2020 (150–300 min moderada
 *    o 75–150 min vigorosa por semana, y fortalecimiento muscular 2 o más días).
 */

export type CategoriaImc = 'bajo' | 'normal' | 'sobrepeso' | 'obesidad';

export interface ResultadoImc {
  valor: number;
  categoria: CategoriaImc;
  etiqueta: string;
  /** Rango de peso con IMC entre 18,5 y 24,9 para esa estatura (kg). */
  pesoSano: [number, number];
}

const redondear = (n: number, dec = 1) => Math.round(n * 10 ** dec) / 10 ** dec;

export function calcularImc(pesoKg: number, estaturaCm: number): ResultadoImc | null {
  if (!(pesoKg >= 20 && pesoKg <= 350 && estaturaCm >= 100 && estaturaCm <= 250)) return null;
  const m = estaturaCm / 100;
  const valor = redondear(pesoKg / (m * m));
  let categoria: CategoriaImc;
  let etiqueta: string;
  if (valor < 18.5) {
    categoria = 'bajo';
    etiqueta = 'Bajo peso';
  } else if (valor < 25) {
    categoria = 'normal';
    etiqueta = 'Peso saludable';
  } else if (valor < 30) {
    categoria = 'sobrepeso';
    etiqueta = 'Sobrepeso';
  } else {
    categoria = 'obesidad';
    etiqueta = 'Obesidad';
  }
  return {
    valor,
    categoria,
    etiqueta,
    pesoSano: [redondear(18.5 * m * m), redondear(24.9 * m * m)],
  };
}

export interface ZonaFc {
  nombre: string;
  descripcion: string;
  min: number;
  max: number;
}

export interface ResultadoFc {
  fcMax: number;
  metodo: 'tanaka' | 'karvonen';
  zonas: ZonaFc[];
}

const ZONAS: readonly [string, string, number, number][] = [
  ['Zona 1 · Muy suave', 'Calentamiento y recuperación', 0.5, 0.6],
  ['Zona 2 · Suave', 'Resistencia básica; puedes conversar', 0.6, 0.7],
  ['Zona 3 · Moderada', 'Mejora la capacidad aeróbica', 0.7, 0.8],
  ['Zona 4 · Intensa', 'Ritmo exigente; hablar cuesta', 0.8, 0.9],
  ['Zona 5 · Máxima', 'Esfuerzos muy cortos', 0.9, 1],
];

export function calcularZonasFc(edad: number, fcReposo?: number | null): ResultadoFc | null {
  if (!(edad >= 15 && edad <= 100)) return null;
  const fcMax = Math.round(208 - 0.7 * edad);
  const reposoValido = fcReposo != null && fcReposo >= 35 && fcReposo <= 110 && fcReposo < fcMax;
  const zonas = ZONAS.map(([nombre, descripcion, a, b]) => {
    const f = (p: number) =>
      Math.round(reposoValido ? (fcMax - fcReposo!) * p + fcReposo! : fcMax * p);
    return { nombre, descripcion, min: f(a), max: f(b) };
  });
  return { fcMax, metodo: reposoValido ? 'karvonen' : 'tanaka', zonas };
}

export interface ResultadoActividad {
  /** Minutos moderados equivalentes (1 min vigoroso = 2 min moderados). */
  equivalentes: number;
  /** Porcentaje de la meta mínima de 150 minutos (puede pasar de 100). */
  porcentaje: number;
  nivel: 'insuficiente' | 'cumple' | 'optimo';
  fuerzaOk: boolean;
  mensaje: string;
}

export function evaluarActividad(
  minModerada: number,
  minVigorosa: number,
  diasFuerza: number,
): ResultadoActividad {
  const mod = Math.max(0, Math.min(3000, minModerada || 0));
  const vig = Math.max(0, Math.min(3000, minVigorosa || 0));
  const equivalentes = mod + 2 * vig;
  const porcentaje = Math.round((equivalentes / 150) * 100);
  const fuerzaOk = (diasFuerza || 0) >= 2;
  let nivel: ResultadoActividad['nivel'];
  let mensaje: string;
  if (equivalentes < 150) {
    nivel = 'insuficiente';
    mensaje = `Te faltan ${150 - equivalentes} minutos moderados (o ${Math.ceil((150 - equivalentes) / 2)} vigorosos) para la meta mínima semanal.`;
  } else if (equivalentes < 300) {
    nivel = 'cumple';
    mensaje = 'Cumples la recomendación mínima. Llegar a 300 minutos suma beneficios adicionales.';
  } else {
    nivel = 'optimo';
    mensaje = 'Superas los 300 minutos: estás en el rango de mayor beneficio.';
  }
  return { equivalentes, porcentaje, nivel, fuerzaOk, mensaje };
}
