/**
 * Noticias de salud resumidas por el consultorio, siempre con enlace a la fuente.
 * Para agregar una: copia un bloque, pon la fecha de la nota (AAAA-MM-DD), la fuente,
 * un resumen corto en palabras sencillas y "qué puedes hacer". La página muestra las más recientes.
 */
export interface Noticia {
  fecha: string;
  fuente: string;
  titulo: string;
  resumen: string;
  queHacer: string;
  enlace: string;
}

export const NOTICIAS: readonly Noticia[] = [
  {
    fecha: '2026-11-18',
    fuente: 'OPS/OMS',
    titulo: 'Semana mundial para cuidar los antibióticos',
    resumen:
      'Del 18 al 24 de noviembre se conmemora la Semana Mundial de Concientización sobre la Resistencia a los Antimicrobianos, con el lema «Una sola salud, una sola acción».',
    queHacer:
      'Usa antibióticos solo cuando te los formulen, sigue el tratamiento completo y no los tires por el desagüe.',
    enlace:
      'https://www.paho.org/es/campanas/semana-mundial-concientizacion-sobre-resistencia-antimicrobianos-2026',
  },
  {
    fecha: '2026-11-18',
    fuente: 'Minsalud (vía Consultorsalud)',
    titulo: 'La EPOC causó 17.560 muertes en Colombia en 2025',
    resumen:
      'El Ministerio de Salud presentó estas cifras en un foro sobre salud respiratoria, alrededor del Día Mundial de la EPOC.',
    queHacer:
      'Evita el cigarrillo y el humo de leña. Si te falta el aire al subir escaleras o tienes tos de mucho tiempo, consúltalo.',
    enlace: 'https://consultorsalud.com/epoc-en-colombia-dejo-17-560-muertes/',
  },
  {
    fecha: '2026-11-12',
    fuente: 'OPS/OMS',
    titulo: '112 millones de adultos viven con diabetes en las Américas',
    resumen:
      'Con motivo del Día Mundial de la Diabetes, la OPS recordó que más del 40 % de las personas con diabetes en el mundo no saben que la tienen.',
    queHacer:
      'Muévete con regularidad, come saludable y revisa tu azúcar en un chequeo, aunque te sientas bien.',
    enlace:
      'https://www.paho.org/es/noticias/12-11-2026-diabetes-americas-112-millones-adultos-viven-con-enfermedad-persisten-brechas',
  },
  {
    fecha: '2026-01-02',
    fuente: 'INS (vía Radio Nacional)',
    titulo: '1.419 personas se quemaron con pólvora la temporada pasada',
    resumen:
      'Entre el 1 de diciembre de 2025 y el 1 de enero de 2026 hubo 1.419 lesionados por pólvora en Colombia; 428 eran menores de edad.',
    queHacer:
      'Celebra sin pólvora. Ante una quemadura, ve a urgencias y no apliques remedios caseros.',
    enlace: 'https://radionacional.co/actualidad/quemados-por-polvora-en-colombia-aumentaron-104',
  },
];

/** Las `n` noticias más recientes, de la más nueva a la más antigua. */
export function ultimasNoticias(n = 4, lista: readonly Noticia[] = NOTICIAS): Noticia[] {
  return [...lista].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, n);
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];

/** '2026-11-18' → '18 nov 2026' */
export function fechaCorta(iso: string): string {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} ${MESES[m - 1]} ${a}`;
}
