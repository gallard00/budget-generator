import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BudgetItem } from '../models/budget-item.model';

/**
 * Servicio para compartir ítems entre Calculator y Budgets.
 * 
 * (SRP) Maneja una única responsabilidad: estado temporal de ítems.
 */
@Injectable({ providedIn: 'root' })
export class SharedDataService {

  /** Fuente reactiva del estado */
  private itemsSource = new BehaviorSubject<BudgetItem[]>([]);

  /** Observable público */
  items$ = this.itemsSource.asObservable();

  constructor() {
    this.restoreFromSession();
  }

  /**
   * Retorna la lista actual de ítems.
   */
  getItems(): BudgetItem[] {
    return this.itemsSource.value;
  }

  /**
   * Agrega un nuevo ítem al estado.
   */
  addItem(item: BudgetItem): void {
    const updated = [...this.itemsSource.value, item];
    this.updateState(updated);
  }

  /**
   * Elimina un ítem por índice.
   */
  removeItem(index: number): void {
    const current = [...this.itemsSource.value];
    current.splice(index, 1);
    this.updateState(current);
  }

  /**
   * Limpia todos los ítems guardados.
   */
  clear(): void {
    this.updateState([]);
  }

  /**
   * Restablece datos desde sessionStorage si existen.
   */
  private restoreFromSession(): void {
    const raw = sessionStorage.getItem('pendingItems');
    if (raw) {
      this.itemsSource.next(JSON.parse(raw));
    }
  }

  /**
   * Actualiza estado + sessionStorage
   */
  private updateState(newState: BudgetItem[]): void {
    this.itemsSource.next(newState);
    sessionStorage.setItem('pendingItems', JSON.stringify(newState));
  }
}
