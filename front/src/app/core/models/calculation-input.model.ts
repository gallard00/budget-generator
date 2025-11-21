import { MaterialType } from './material-type.enum';

/**
 * Datos de entrada para la calculadora de materiales.
 */
export interface CalculationInput {
  /** Ancho de la superficie en metros. */
  width: number;

  /** Alto de la superficie en metros. */
  height: number;

  /** Tipo de material seleccionado. */
  materialType: MaterialType;
}

