import { HttpErrorResponse } from '@angular/common/http';

/** Convierte un error HTTP en un mensaje que el usuario entiende. */
export function mensajeDeError(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0)
      return 'No pudimos conectarnos. Revisa tu internet o escríbenos por WhatsApp.';
    const msg = (err.error as { message?: string } | null)?.message;
    if (msg) return msg;
    if (err.status === 401) return 'Tu sesión terminó. Vuelve a iniciar sesión.';
  }
  return 'Ocurrió un error. Intenta de nuevo en unos minutos.';
}
