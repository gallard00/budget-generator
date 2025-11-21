/**
 * Entrada de historial de un presupuesto.
 * Coincide con BudgetHistoryResponse del backend.
 */
export interface BudgetHistory {
  /** ID del registro de historial. */
  id: number;

  /** Fecha en la que se generó el cambio. */
  changeDate: string;

  /**
   * Snapshot del presupuesto antes del cambio,
   * en formato JSON (string).
   */
  previousData: string;
}
