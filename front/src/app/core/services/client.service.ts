import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

/**
 * Servicio CRUD para clientes.
 */
@Injectable({ providedIn: 'root' })
export class ClientService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/clients';

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.API_URL);
  }

  create(data: Client): Observable<Client> {
    return this.http.post<Client>(this.API_URL, data);
  }

  update(id: number, data: Client): Observable<Client> {
    return this.http.put<Client>(`${this.API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
