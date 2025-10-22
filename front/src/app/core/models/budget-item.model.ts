// ✅ Interface que representa un ítem dentro de un presupuesto (Budget)
export interface BudgetItem {
  /** 
   * Identificador único del ítem.
   * Opcional porque todavía no existe antes de persistir en la base de datos.
   */
  id?: number;

  /** 
   * Descripción del ítem (por ejemplo, “Pintura interior” o “Revoque fino”).
   */
  description: string;

  /** 
   * Cantidad del ítem (puede representar unidades, metros cuadrados, etc.).
   */
  quantity: number;

  /** 
   * Precio unitario del ítem, expresado en moneda local (ARS).
   */
  unitPrice: number;
}
