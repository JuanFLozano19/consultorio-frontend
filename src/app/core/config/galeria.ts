/**
 * Imágenes de los carruseles. Para agregar una foto o una publicación:
 * 1. Guarde la imagen (WebP o JPG) en public/images/galeria o public/images/publicidad.
 * 2. Agregue una línea aquí con su ruta, su descripción (alt) y su tamaño real.
 */
export interface ImagenCarrusel {
  readonly src: string;
  /** Descripción para lectores de pantalla y buscadores. */
  readonly alt: string;
  /** Texto corto que se muestra debajo de la imagen (opcional). */
  readonly titulo?: string;
  readonly ancho: number;
  readonly alto: number;
}

const foto = (archivo: string, alt: string, titulo: string, alto = 1200): ImagenCarrusel => ({
  src: `images/galeria/${archivo}.webp`,
  alt,
  titulo,
  ancho: 900,
  alto,
});

export const GALERIA: readonly ImagenCarrusel[] = [
  foto('real-cielo-3', 'Dr. Jeison Patiño con uniforme y fonendoscopio', 'Tu médico de confianza'),
  foto(
    'ia-resonancia',
    'El doctor explica una resonancia a un paciente deportista',
    'Te explico tu diagnóstico',
    1080,
  ),
  foto(
    'real-escribiendo-1',
    'El doctor con bata escribiendo en el consultorio',
    'Consulta con tiempo',
  ),
  foto(
    'ia-deportiva',
    'El doctor en un consultorio con elementos de entrenamiento',
    'Actividad física y salud',
    1080,
  ),
  foto('real-cielo-1', 'Retrato del Dr. Jeison Patiño junto a la ventana', 'Medicina general'),
  foto(
    'ia-paciente-charla',
    'El doctor conversa con un paciente',
    'Escucharte es parte del tratamiento',
    1080,
  ),
  foto(
    'real-bata-silla',
    'El doctor con bata blanca sentado en el consultorio',
    'Consulta particular',
  ),
  foto(
    'ia-tablet',
    'El doctor revisa un plan de ejercicio en una tableta',
    'Plan de ejercicio a tu medida',
    1080,
  ),
  foto('real-escribiendo-2', 'El doctor tomando notas durante la consulta', 'Certificados médicos'),
  foto('ia-brazos-ventana', 'El doctor sentado en su consultorio', 'Prevenir es cuidarte', 1080),
  foto('real-cielo-2', 'El doctor con uniforme azul y fonendoscopio', 'Chequeo preventivo'),
  foto('ia-libreta', 'El doctor escribe en su libreta', 'Seguimiento de tu salud', 1080),
];

const pub = (archivo: string, titulo: string): ImagenCarrusel => ({
  src: `images/publicidad/${archivo}.webp`,
  alt: `Publicación del consultorio: ${titulo}`,
  titulo,
  ancho: 720,
  alto: 900,
});

export const PUBLICACIONES: readonly ImagenCarrusel[] = [
  pub('01-tu-salud', 'Tu salud, en buenas manos'),
  pub('02-diagnostico', 'Entiende tu diagnóstico'),
  pub('03-movimiento', 'Moverte también es medicina'),
  pub('04-escucharte', 'Escucharte es parte del tratamiento'),
  pub('05-certificados', 'Tu certificado, sin complicaciones'),
  pub('06-plan-ejercicio', 'Un plan hecho a tu medida'),
  pub('07-prevencion', 'No esperes a sentirte mal'),
  pub('08-agenda-pop', '¡Agenda tu consulta!'),
  pub('09-apertura', '¡Abrimos consultorio!'),
  pub('10-servicios', '¿En qué te ayudamos?'),
  pub('11-ubicacion', 'Te esperamos en el piso 5'),
  pub('12-actividad', 'Actividad física y salud'),
];
