export type IconName = 'stethoscope' | 'pulse' | 'heart' | 'document' | 'whatsapp' | 'instagram' | 'pin';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  orden: number;
  activo: boolean;
}
