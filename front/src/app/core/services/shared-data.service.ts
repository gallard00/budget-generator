// ✅ Importamos los decoradores e interfaces necesarios de Angular
import { Injectable } from '@angular/core';

// ✅ Importamos `BehaviorSubject` de RxJS, que nos permite manejar un estado reactivo y subscribible.
import { BehaviorSubject } from 'rxjs';

// ✅ Importamos el modelo `BudgetItem` para tipar correctamente los datos que se comparten.
import { BudgetItem } from '../models/budget-item.model';

/**
 * 💾 Servicio de Datos Compartidos (SharedDataService)
 * 
 * Este servicio permite **compartir información entre componentes** sin necesidad
 * de pasar datos por `@Input()` o `@Output()`.  
 * 
 * En este caso, conecta la vista **Calculator** con **Budgets**, manteniendo los ítems
 * agregados en memoria (y en `sessionStorage` para persistencia temporal).
 */
@Injectable({
  providedIn: 'root' // 👉 Esto hace que el servicio sea singleton y accesible en toda la app.
})
export class SharedDataService {

  /**
   * 🧠 `BehaviorSubject` es una fuente de datos reactiva que mantiene el último valor emitido.
   * 
   * - `BudgetItem[]` → tipo de datos que guarda (lista de ítems de presupuesto)
   * - `[]` → valor inicial vacío
   */
  private itemsSource = new BehaviorSubject<BudgetItem[]>([]);

  /**
   * 📡 Observable que los componentes pueden suscribirse para reaccionar a cambios.
   * 
   * Ejemplo: en `BudgetsComponent`, nos suscribimos a `items$` para detectar nuevos ítems.
   */
  items$ = this.itemsSource.asObservable();

  /**
   * ➕ Agrega un nuevo ítem al estado compartido.
   * 
   * - Recupera la lista actual de ítems.
   * - Crea una nueva lista (`spread operator` para no mutar el array original).
   * - Actualiza el `BehaviorSubject` y el `sessionStorage`.
   */
  addItem(item: BudgetItem) {
    const currentItems = this.getItems();
    const updated = [...currentItems, item];
    console.log('✅ SharedDataService guardó item:', updated);

    // Emite la nueva lista para todos los componentes suscritos
    this.itemsSource.next(updated);

    // Persiste la lista en sessionStorage (para que no se pierda al navegar)
    sessionStorage.setItem('pendingItems', JSON.stringify(updated));
  }

  /**
   * 📦 Recupera todos los ítems guardados.
   * 
   * - Primero intenta leer `sessionStorage` (para mantener estado al recargar o cambiar ruta).
   * - Si no hay datos guardados, devuelve un array vacío.
   */
  getItems(): BudgetItem[] {
    const data = sessionStorage.getItem('pendingItems');
    if (data) {
      const parsed = JSON.parse(data);
      console.log('📦 Recuperado desde sessionStorage:', parsed);
      return parsed;
    }
    return [];
  }

  /**
   * 🧹 Limpia todos los ítems tanto en memoria como en el almacenamiento temporal.
   * 
   * - Vacía el `BehaviorSubject`.
   * - Elimina el registro de `sessionStorage`.
   */
  clear() {
    console.log('🧹 Limpiando SharedDataService');
    this.itemsSource.next([]);
    sessionStorage.removeItem('pendingItems');
  }

  /**
   * 🗑️ Elimina un ítem de la lista por su índice.
   * 
   * - Carga los ítems actuales.
   * - Remueve el elemento con `splice`.
   * - Actualiza tanto el `BehaviorSubject` como el `sessionStorage`.
   */
  removeItem(index: number) {
    const items = this.getItems();
    items.splice(index, 1);
    this.itemsSource.next(items);
    sessionStorage.setItem('pendingItems', JSON.stringify(items));
    console.log(`🗑️ Item ${index} eliminado del presupuesto`);
  }
}
