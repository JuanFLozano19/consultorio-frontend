/**
 * Datos fijos del consultorio que muestra la web.
 * Para cambiar teléfono, horario, servicios o textos, edite este archivo.
 */
import { Servicio } from '../models/servicio.model';

export const SITE = {
  features: {
    /**
     * false (actual): web 100 % estática. El formulario arma el mensaje y abre WhatsApp;
     *   los servicios salen de `servicios` de abajo; no hay /admin ni base de datos.
     * true: el formulario guarda la cita en consultorio-backend, los servicios se leen
     *   de la API y se activa el panel /admin. Requiere la API publicada (ver README).
     */
    citasEnLinea: false,
  },
  doctor: {
    name: 'Dr. Jeison Patiño',
    fullName: '[NOMBRE COMPLETO]',
    title: 'Médico general',
    medicalRegistry: '1071550470',
    education: [
      { label: 'Pregrado', degree: 'Médico y cirujano general', school: 'Fundación Universitaria Juan N. Corpas' },
      { label: 'Posgrado', degree: 'Máster en Actividad Física y Salud', school: 'Fundación Universitaria Iberoamericana' },
    ],
    /** Ruta dentro de /public, ej. 'images/dr-jeison.jpg'. Vacío = recuadro de espera. */
    photo: '',
    bio: [
      'Soy médico y cirujano general y Máster en Actividad Física y Salud. En mi consulta me tomo el tiempo de escucharte y explicarte con claridad cada síntoma, la posible patología, la forma de manejo, el tratamiento y las prevenciones.',
    ],
  },
  contact: {
    /** WhatsApp laboral con indicativo 57, solo dígitos. Ej: '573001234567'. */
    whatsapp: '573126885199',
    whatsappMessage: 'Hola Dr. Patiño, quiero reservar una consulta.',
    /** Usuario de Instagram sin @. */
    instagram: 'dr.jeisonpatino',
    address: {
      street: 'Carrera 18 # 80-74',
      floor: 'Piso 5',
      building: 'Edificio Habital Medical Center',
      city: '',
      mapsQuery: 'Habital Medical Center Carrera 18 80-74',
    },
    hours: [
      { days: 'Lunes a viernes', time: '[HORARIO]' },
      { days: 'Sábados', time: '[HORARIO]' },
      { days: 'Domingos y festivos', time: 'Sin atención' },
    ],
  },
  activity: {
    lead: 'Con máster en Actividad Física y Salud, hago uso del ejercicio como parte del tratamiento. En tu plan defino el tipo, la intensidad, la frecuencia y el número de repeticiones, según lo que encuentre en tu consulta.',
    prescription: ['Tipo', 'Intensidad', 'Frecuencia', 'Número de repeticiones'],
    audiences: [
      { title: 'Si quieres empezar a hacer ejercicio', text: 'Previniendo ciertas lesiones.' },
      { title: 'Si tienes presión alta, diabetes o sobrepeso', text: 'El ejercicio bien dosificado ayuda a controlarlos.' },
      { title: 'Si vuelves después de una lesión o una pausa larga', text: 'Para retomar con un plan seguro y progresivo.' },
      { title: 'Si eres adulto mayor', text: 'Para mantener fuerza, equilibrio y masa muscular.' },
    ],
  },
  /** Servicios de la web. Con citasEnLinea=true se leen de la API y esta lista queda de respaldo. */
  servicios: [
    { id: 1, nombre: 'Consulta médica general', descripcion: 'Valoración completa, diagnóstico y tratamiento para adultos y niños.', icono: 'stethoscope', orden: 1, activo: true },
    { id: 2, nombre: 'Asesoría en actividad física', descripcion: 'Plan de ejercicio a tu medida: tipo, intensidad, frecuencia y número de repeticiones.', icono: 'pulse', orden: 2, activo: true },
    { id: 3, nombre: 'Chequeo preventivo', descripcion: 'Control de presión, peso y factores de riesgo antes de que aparezcan los síntomas.', icono: 'heart', orden: 3, activo: true },
    { id: 4, nombre: 'Certificados médicos', descripcion: 'Certificados de salud, aptitud física e incapacidades.', icono: 'document', orden: 4, activo: true },
  ] satisfies Servicio[],
};

export function whatsappHref(): string {
  const { whatsapp, whatsappMessage } = SITE.contact;
  return whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}` : '#reserva';
}

export function whatsappDisplay(): string {
  const n = SITE.contact.whatsapp;
  return n ? '+' + n.replace(/^57(\d{3})(\d{3})(\d{4})$/, '57 $1 $2 $3') : '[WHATSAPP]';
}

export function instagramHref(): string {
  return SITE.contact.instagram ? `https://www.instagram.com/${SITE.contact.instagram}/` : '';
}

export function mapsHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.contact.address.mapsQuery)}`;
}
