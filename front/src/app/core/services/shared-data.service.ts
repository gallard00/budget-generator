import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BudgetItem } from '../models/budget-item.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private itemsSource = new BehaviorSubject<BudgetItem[]>([]);
  items$ = this.itemsSource.asObservable();

  // ✅ Guardar un nuevo ítem (lo agrega a la lista actual)
  addItem(item: BudgetItem) {
    const currentItems = this.getItems();
    const updated = [...currentItems, item];
    console.log('✅ SharedDataService guardó item:', updated);
    this.itemsSource.next(updated);
    sessionStorage.setItem('pendingItems', JSON.stringify(updated));
  }

  // ✅ Obtener todos los ítems guardados
  getItems(): BudgetItem[] {
    const data = sessionStorage.getItem('pendingItems');
    if (data) {
      const parsed = JSON.parse(data);
      console.log('📦 Recuperado desde sessionStorage:', parsed);
      return parsed;
    }
    return [];
  }

  // ✅ Limpiar todos los ítems
  clear() {
    console.log('🧹 Limpiando SharedDataService');
    this.itemsSource.next([]);
    sessionStorage.removeItem('pendingItems');
  }

  removeItem(index: number) {
  const items = this.getItems();
  items.splice(index, 1);
  this.itemsSource.next(items);
  sessionStorage.setItem('pendingItems', JSON.stringify(items));
  console.log(`🗑️ Item ${index} eliminado del presupuesto`);
}

}
