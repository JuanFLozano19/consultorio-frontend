import { ResultadoActividad, evaluarActividad } from './calculos';

/**
 * Test rápido «¿Te mueves lo suficiente?» basado en las recomendaciones de la OMS para
 * adultos (150–300 min/semana de actividad moderada o 75–150 vigorosa, fuerza ≥ 2 días,
 * menos tiempo sentado y, desde los 65, equilibrio y fuerza ≥ 3 días). Es orientativo.
 */
export interface PreguntaTest {
  id: 'dias' | 'intensa' | 'fuerza' | 'sentado' | 'edad';
  texto: string;
  ayuda?: string;
  opciones: string[];
}

export const PREGUNTAS: readonly PreguntaTest[] = [
  {
    id: 'dias',
    texto: '¿Cuántos días a la semana haces al menos 30 minutos de actividad moderada?',
    ayuda:
      'Caminar rápido, bailar o montar bici suave: se acelera la respiración, pero puedes hablar.',
    opciones: ['Ningún día', '1 o 2 días', '3 o 4 días', '5 o más días'],
  },
  {
    id: 'intensa',
    texto: '¿Y actividad intensa, de la que casi no te deja hablar?',
    ayuda: 'Trotar, nadar rápido, un partido de fútbol o una clase de rumba fuerte.',
    opciones: ['No', 'Una vez por semana (unos 30 min)', 'Dos o más veces por semana'],
  },
  {
    id: 'fuerza',
    texto: '¿Cuántos días a la semana haces ejercicios de fuerza?',
    ayuda: 'Sentadillas, flexiones, bandas elásticas, pesas o cargar peso.',
    opciones: ['Ninguno', '1 día', '2 días o más'],
  },
  {
    id: 'sentado',
    texto: '¿Cuántas horas al día pasas sentado?',
    ayuda: 'Trabajo, estudio, carro, pantallas… sin contar el tiempo de dormir.',
    opciones: ['Menos de 6 horas', 'Entre 6 y 8 horas', 'Más de 8 horas'],
  },
  {
    id: 'edad',
    texto: '¿Qué edad tienes?',
    opciones: ['18 a 64 años', '65 años o más'],
  },
];

/** Índice de la opción elegida en cada pregunta, en el mismo orden de PREGUNTAS. */
export type Respuestas = readonly number[];

export interface ResultadoTest extends ResultadoActividad {
  titulo: string;
  consejos: string[];
}

const MIN_MODERADA = [0, 45, 105, 165];
const MIN_VIGOROSA = [0, 30, 60];
const DIAS_FUERZA = [0, 1, 2];

export function resultadoTest(r: Respuestas): ResultadoTest {
  const [dias = 0, intensa = 0, fuerza = 0, sentado = 0, edad = 0] = r;
  const base = evaluarActividad(MIN_MODERADA[dias], MIN_VIGOROSA[intensa], DIAS_FUERZA[fuerza]);
  const consejos: string[] = [];

  if (base.nivel === 'insuficiente') {
    consejos.push(
      'Suma de a poquito: 10 minutos más al día ya cuentan, y caminar es un gran comienzo.',
    );
  }
  if (!base.fuerzaOk) {
    consejos.push(
      'Agrega ejercicios de fuerza 2 días por semana: sentadillas, bandas o tu propio peso.',
    );
  }
  if (sentado >= 1) {
    consejos.push('Interrumpe el tiempo sentado: levántate y muévete unos minutos cada hora.');
  }
  if (edad === 1) {
    consejos.push(
      'Desde los 65, la OMS recomienda ejercicios de equilibrio y fuerza al menos 3 días por semana: ayudan a prevenir caídas.',
    );
  }
  if (!consejos.length) {
    consejos.push(
      '¡Vas muy bien! Mantén el ritmo y ve variando tus actividades para no aburrirte.',
    );
  }

  const titulo =
    base.nivel === 'insuficiente'
      ? 'Vas en camino'
      : base.nivel === 'cumple'
        ? '¡Cumples la meta!'
        : '¡Excelente nivel!';

  return { ...base, titulo, consejos };
}
