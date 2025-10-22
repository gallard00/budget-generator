/**
 * ✅ Representa el resultado de un cálculo de superficie
 * y costo total para un tipo de material determinado.
 */
export interface CalculationResult {
  /**
   * Superficie total calculada en metros cuadrados (m²).
   * Se obtiene multiplicando el ancho por el alto del área.
   */
  squareMeters: number;

  /**
   * Precio total estimado del trabajo o material.
   * Se calcula como `squareMeters * precioPorMetroCuadrado`.
   */
  totalPrice: number;
}
