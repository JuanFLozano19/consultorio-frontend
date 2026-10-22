import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../models/auth.model';

const STORAGE_KEY = 'consultorio.sesion';

interface Sesion {
  token: string;
  usuario: Usuario;
  expiraEn: number; // epoch ms
}

/** Sesión del panel administrativo. Se guarda en sessionStorage: se borra al cerrar el navegador. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly sesion = signal<Sesion | null>(this.leer());

  readonly usuario = computed(() => this.sesion()?.usuario ?? null);
  readonly autenticado = computed(() => {
    const s = this.sesion();
    return !!s && s.expiraEn > Date.now();
  });

  token(): string | null {
    return this.autenticado() ? this.sesion()!.token : null;
  }

  login(correo: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { correo, password }).pipe(
      tap((r) => {
        const s: Sesion = { token: r.token, usuario: r.usuario, expiraEn: Date.now() + r.expiraEnMs };
        this.sesion.set(s);
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
        } catch {
          /* almacenamiento no disponible: la sesión vive solo en memoria */
        }
      }),
    );
  }

  logout(): void {
    this.sesion.set(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nada que limpiar */
    }
    this.router.navigateByUrl('/admin/login');
  }

  private leer(): Sesion | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Sesion) : null;
    } catch {
      return null;
    }
  }
}
