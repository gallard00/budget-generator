import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Budget } from '../models/budget.model';
import { BudgetHistory } from '../models/budget-history.model';

/**
 * Servicio para consumir la API de presupuestos:
 * CRUD, exportación a PDF e historial.
 */
@Injectable({ providedIn: 'root' })
export class BudgetService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8080/api';
  private readonly BUDGET_URL = `${this.BASE_URL}/budgets`;
  private readonly EXPORT_URL = `${this.BASE_URL}/export/pdf`;

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

  /**
   * Devuelve el historial de cambios de un presupuesto dado.
   */
  getHistory(budgetId: number): Observable<BudgetHistory[]> {
    return this.http.get<BudgetHistory[]>(`${this.BUDGET_URL}/${budgetId}/history`);
  }

  /**
   * Descarga y abre el PDF del presupuesto en una nueva pestaña.
   */
  exportPdf(id: number): Observable<Blob> {
    return this.http
      .get(`${this.EXPORT_URL}/${id}`, { responseType: 'blob' })
      .pipe(
        tap((blob) => {
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        })
      );
  }
}
