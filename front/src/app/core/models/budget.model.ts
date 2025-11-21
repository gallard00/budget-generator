import { BudgetItem } from './budget-item.model';

/**
 * Presupuesto completo.
 */
export interface Budget {
  /** ID generado por el backend. */
  id?: number;

  /** Fecha del presupuesto (YYYY-MM-DD). */
  date: string;

  /** Total calculado, opcional (lo define el backend). */
  total?: number;

  /** ID del cliente asociado. */
  clientId: number;

  /** Nombre del cliente (campo de conveniencia para mostrar). */
  client?: string;

  /** Lista de ítems incluidos en el presupuesto. */
  items: BudgetItem[];
}

