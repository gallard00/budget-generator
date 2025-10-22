import { MaterialType } from './material-type.enum';

export interface CalculationInput {
  width: number;
  height: number;
  materialType: MaterialType;
}
