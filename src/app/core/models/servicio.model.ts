export type IconName = 'stethoscope' | 'pulse' | 'heart' | 'document' | 'whatsapp' | 'pin';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  orden: number;
  activo: boolean;
}
