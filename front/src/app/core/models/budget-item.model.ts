/**
 * Ítem dentro de un presupuesto.
 */
export interface BudgetItem {
  /** ID generado por el backend. */
  id?: number;

  /** Descripción del trabajo o material. */
  description: string;

  /** Cantidad (unidades, m², etc.). */
  quantity: number;

  /** Precio unitario del ítem. */
  unitPrice: number;
}

