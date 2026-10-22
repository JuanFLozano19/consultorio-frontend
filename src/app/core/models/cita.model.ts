export type Franja = 'MANANA' | 'TARDE';
export type EstadoCita = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'ATENDIDA';

export interface SolicitarCitaRequest {
  nombrePaciente: string;
  documento: string;
  telefono: string;
  correo: string | null;
  servicioId: number | null;
  fechaPreferida: string; // yyyy-MM-dd
  franja: Franja;
  motivo: string | null;
  aceptaTratamientoDatos: boolean;
}

export interface SolicitudCitaResponse {
  id: number;
  estado: EstadoCita;
  mensaje: string;
}

export interface Cita {
  id: number;
  nombrePaciente: string;
  documento: string;
  telefono: string;
  correo: string | null;
  servicioId: number | null;
  servicioNombre: string | null;
  fechaPreferida: string;
  franja: Franja;
  motivo: string | null;
  estado: EstadoCita;
  notasInternas: string | null;
  fechaSolicitud: string;
  fechaActualizacion: string;
}

export interface Pagina<T> {
  contenido: T[];
  pagina: number;
  tamano: number;
  totalElementos: number;
  totalPaginas: number;
}

export interface ApiError {
  status: number;
  message: string;
}

/** Mismas reglas que el backend (EstadoCita.siguientesPermitidos). */
export const SIGUIENTES_ESTADOS: Record<EstadoCita, EstadoCita[]> = {
  PENDIENTE: ['CONFIRMADA', 'CANCELADA'],
  CONFIRMADA: ['ATENDIDA', 'CANCELADA'],
  CANCELADA: [],
  ATENDIDA: [],
};
