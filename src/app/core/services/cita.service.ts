import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cita, EstadoCita, Pagina, SolicitarCitaRequest, SolicitudCitaResponse } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/citas`;

  solicitar(request: SolicitarCitaRequest): Observable<SolicitudCitaResponse> {
    return this.http.post<SolicitudCitaResponse>(this.url, request);
  }

  listar(estado: EstadoCita | null, pagina = 0, tamano = 20): Observable<Pagina<Cita>> {
    let params = new HttpParams().set('pagina', pagina).set('tamano', tamano);
    if (estado) params = params.set('estado', estado);
    return this.http.get<Pagina<Cita>>(this.url, { params });
  }

  cambiarEstado(id: number, estado: EstadoCita, notasInternas?: string): Observable<Cita> {
    return this.http.patch<Cita>(`${this.url}/${id}/estado`, { estado, notasInternas });
  }
}
