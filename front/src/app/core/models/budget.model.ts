import { BudgetItem } from './budget-item.model';

/**
 * ✅ Representa un presupuesto completo dentro del sistema.
 * 
 * Contiene la información principal del presupuesto, el cliente asociado
 * y la lista de ítems que lo componen.
 */
export interface Budget {
  /** 
   * Identificador único del presupuesto.
   * Opcional porque se genera automáticamente al guardar en la base de datos.
   */
  id?: number;

  /** 
   * Fecha del presupuesto en formato ISO (YYYY-MM-DD).
   */
  date: string;

  /** 
   * Total calculado del presupuesto (suma de los subtotales de cada ítem).
   * Opcional porque puede calcularse en el backend.
   */
  total?: number;

  /** 
   * Identificador del cliente al que pertenece este presupuesto.
   * Es obligatorio ya que todo presupuesto debe asociarse a un cliente.
   */
  clientId: number;

  /** 
   * Nombre del cliente (campo de conveniencia para mostrar en el frontend).
   * No siempre está presente, depende de la respuesta del backend.
   */
  client?: string;

  /** 
   * Lista de ítems que forman parte del presupuesto.
   * Cada ítem contiene descripción, cantidad y precio unitario.
   */
  items: BudgetItem[];
}
