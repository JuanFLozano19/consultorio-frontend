import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SITE } from '../config/site.config';
import { Servicio } from '../models/servicio.model';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/servicios`;

  /** Servicios activos. Si la API no responde, usa la lista local para que la web no quede vacía. */
  listarActivos(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.url).pipe(catchError(() => of(SITE.fallbackServices)));
  }
}
