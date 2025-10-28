import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Budget } from '../models/budget.model';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8080/api';
  private BUDGET_URL = `${this.BASE_URL}/budgets`;
  private EXPORT_URL = `${this.BASE_URL}/export/pdf`;

  getAll(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.BUDGET_URL);
  }

  create(data: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.BUDGET_URL, data);
  }

  update(id: number, data: Partial<Budget>): Observable<Budget> {
    return this.http.put<Budget>(`${this.BUDGET_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BUDGET_URL}/${id}`);
  }

  exportPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.EXPORT_URL}/${id}`, { responseType: 'blob' }).pipe(
      tap((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      })
    );
  }
}

