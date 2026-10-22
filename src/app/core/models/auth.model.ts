export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

export interface AuthResponse {
  usuario: Usuario;
  token: string;
  expiraEnMs: number;
}
