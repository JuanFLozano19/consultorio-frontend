/**
 * Frases del juego «¿Mito o dato?» (las mismas de los videos de redes).
 * Información general de fuentes reconocidas (principalmente la OMS); no reemplaza la consulta.
 */
export interface MitoDato {
  frase: string;
  esDato: boolean;
  explicacion: string;
}

export const MITOS_DATOS: readonly MitoDato[] = [
  {
    frase: 'Si el ejercicio no duele, no está sirviendo.',
    esDato: false,
    explicacion: 'No hace falta que duela para que te haga bien.',
  },
  {
    frase: 'Caminar también cuenta como actividad física.',
    esDato: true,
    explicacion: 'Sí: caminar a buen ritmo es actividad física.',
  },
  {
    frase: 'La OMS recomienda a los adultos 150 a 300 minutos de actividad moderada por semana.',
    esDato: true,
    explicacion: 'Fuente: Organización Mundial de la Salud.',
  },
  {
    frase: 'El chequeo es solo para cuando estás enfermo.',
    esDato: false,
    explicacion: 'El chequeo preventivo es justo para cuando te sientes bien.',
  },
  {
    frase: 'Si a mi vecino le sirvió, a mí también.',
    esDato: false,
    explicacion: 'Cada persona es distinta. Por eso se revisa a cada una.',
  },
  {
    frase: 'Todos debemos tomar exactamente 8 vasos de agua al día.',
    esDato: false,
    explicacion: 'Lo que necesitas varía según tu cuerpo, el clima y tu actividad.',
  },
  {
    frase: 'La presión alta muchas veces no da ningún síntoma.',
    esDato: true,
    explicacion: 'Por eso es importante tomarla en los chequeos. (OMS)',
  },
  {
    frase: 'Los antibióticos curan la gripa.',
    esDato: false,
    explicacion: 'La gripa la causa un virus; los antibióticos no sirven contra virus. (OMS)',
  },
  {
    frase: 'Los adultos deberían fortalecer sus músculos al menos 2 días por semana.',
    esDato: true,
    explicacion: 'Recomendación de la Organización Mundial de la Salud.',
  },
  {
    frase: 'Si te sientes bien, no necesitas chequeos.',
    esDato: false,
    explicacion: 'Muchas cosas se detectan antes de que den molestias.',
  },
  {
    frase: 'Entre más sudas, más grasa quemas.',
    esDato: false,
    explicacion: 'Sudar sirve para enfriar el cuerpo; lo que pierdes es agua.',
  },
  {
    frase: 'Lavarse las manos con agua y jabón ayuda a prevenir infecciones.',
    esDato: true,
    explicacion: 'Una de las medidas más sencillas y efectivas. (OMS)',
  },
  {
    frase: 'Toda actividad cuenta: hasta subir escaleras.',
    esDato: true,
    explicacion: 'Cada movimiento suma. (OMS)',
  },
  {
    frase: 'Después de los 40 ya es muy tarde para empezar a hacer ejercicio.',
    esDato: false,
    explicacion: 'La actividad física trae beneficios a cualquier edad. (OMS)',
  },
  {
    frase: 'Los adultos deberían dormir al menos 7 horas por noche.',
    esDato: true,
    explicacion: 'Recomendación general para adultos; cada caso se revisa en consulta.',
  },
  {
    frase: 'Las vacunas son solo para niños.',
    esDato: false,
    explicacion: 'Los adultos también necesitan algunas vacunas. (OMS)',
  },
  {
    frase: 'La OMS recomienda consumir menos de 5 gramos de sal al día.',
    esDato: true,
    explicacion: 'Menos sal ayuda a cuidar la presión arterial. (OMS)',
  },
  {
    frase: 'El ejercicio solo cuenta si es en el gimnasio.',
    esDato: false,
    explicacion: 'Caminar, bailar o subir escaleras también cuentan. (OMS)',
  },
  {
    frase: 'Pasar muchas horas sentado afecta la salud.',
    esDato: true,
    explicacion: 'La OMS recomienda reducir el tiempo sentado.',
  },
  {
    frase: 'Si una medicina me sirvió, se la puedo dar a otra persona.',
    esDato: false,
    explicacion: 'Cada caso es distinto: la formulación debe ser individual.',
  },
  {
    frase: 'El cigarrillo solo afecta los pulmones.',
    esDato: false,
    explicacion: 'El tabaco daña casi todo el cuerpo, también el corazón. (OMS)',
  },
  {
    frase: 'La OMS recomienda comer al menos 400 gramos de frutas y verduras al día.',
    esDato: true,
    explicacion: 'Fuente: Organización Mundial de la Salud.',
  },
  {
    frase: 'Tronarse los dedos causa artritis.',
    esDato: false,
    explicacion: 'Los estudios no han encontrado esa relación.',
  },
  {
    frase: 'La actividad física también ayuda al estado de ánimo.',
    esDato: true,
    explicacion: 'Ayuda a reducir síntomas de estrés y ansiedad. (OMS)',
  },
  {
    frase: 'Si la presión salió bien una vez, nunca más hay que tomarla.',
    esDato: false,
    explicacion: 'Se debe revisar de forma periódica.',
  },
  {
    frase: 'Un traguito diario es bueno para la salud.',
    esDato: false,
    explicacion: 'La OMS dice que no hay un nivel de consumo de alcohol seguro.',
  },
  {
    frase: 'Las enfermedades del corazón son la principal causa de muerte en el mundo.',
    esDato: true,
    explicacion: 'Fuente: Organización Mundial de la Salud.',
  },
  {
    frase: 'Leer con poca luz daña la vista para siempre.',
    esDato: false,
    explicacion: 'Cansa los ojos, pero no causa daño permanente.',
  },
  {
    frase: 'El azúcar alto en la sangre puede no dar síntomas por años.',
    esDato: true,
    explicacion: 'Por eso los chequeos preventivos son importantes.',
  },
  {
    frase: 'El ejercicio solo sirve para bajar de peso.',
    esDato: false,
    explicacion: 'También cuida el corazón, el sueño, los huesos y el ánimo.',
  },
  {
    frase: 'Agua con limón en ayunas quema la grasa.',
    esDato: false,
    explicacion: 'Ninguna bebida quema grasa por sí sola.',
  },
  {
    frase: 'Niños y adolescentes deberían moverse en promedio 60 minutos al día.',
    esDato: true,
    explicacion: 'Recomendación de la Organización Mundial de la Salud.',
  },
  {
    frase: 'Las personas mayores no deberían hacer ejercicios de fuerza.',
    esDato: false,
    explicacion: 'La OMS los recomienda también después de los 65 años.',
  },
  {
    frase: 'Dormir poco de forma seguida afecta la concentración y el ánimo.',
    esDato: true,
    explicacion: 'El descanso también es salud.',
  },
  {
    frase: 'Algo de actividad física es mejor que nada.',
    esDato: true,
    explicacion: 'Puedes empezar poco a poco y aumentar. (OMS)',
  },
];

/** Baraja una copia del arreglo (Fisher–Yates). `azar` permite pruebas deterministas. */
export function barajar<T>(lista: readonly T[], azar: () => number = Math.random): T[] {
  const r = [...lista];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/** Elige `n` preguntas distintas al azar para una ronda. */
export function nuevaRonda(n = 5, azar: () => number = Math.random): MitoDato[] {
  return barajar(MITOS_DATOS, azar).slice(0, Math.min(n, MITOS_DATOS.length));
}

/** Mensaje final según los aciertos. */
export function mensajeFinal(aciertos: number, total: number): string {
  if (aciertos === total) return '¡Perfecto! Te las sabes todas.';
  if (aciertos >= Math.ceil(total * 0.6)) return '¡Muy bien! Vas por buen camino.';
  return 'Buen intento: ahora ya sabes un poco más.';
}
