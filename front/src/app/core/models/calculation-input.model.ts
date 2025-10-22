import { MaterialType } from './material-type.enum';

/**
 * ✅ Representa los datos necesarios para realizar un cálculo
 * de superficie y costo según el tipo de material seleccionado.
 */
export interface CalculationInput {
  /**
   * Ancho de la superficie en metros.
   */
  width: number;

  /**
   * Alto de la superficie en metros.
   */
  height: number;

  /**
   * Tipo de material seleccionado (Porcelanato, Mármol, etc.),
   * definido en el enum `MaterialType`.
   */
  materialType: MaterialType;
}
