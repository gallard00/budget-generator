// Importamos Axios, la librería que usamos para realizar peticiones HTTP al backend.
import axios from 'axios';

// Importamos los modelos que definen los datos de entrada y salida del cálculo.
// Esto nos permite tener tipado fuerte (TypeScript) en todo el flujo de datos.
import { CalculationInput } from '../models/calculation-input.model';
import { CalculationResult } from '../models/calculation-result.model';

/**
 * URL base del endpoint para el módulo de cálculos.
 * 
 * Este endpoint (`/api/calc`) es manejado por el backend (CalculationController),
 * que aplica el patrón Strategy para calcular costos según el tipo de material.
 */
const API_URL = 'http://localhost:8080/api/calc';

/**
 * Servicio de Cálculos
 * 
 * Este servicio envía al backend los datos del cálculo (ancho, alto, tipo de material)
 * y recibe el resultado: metros cuadrados totales y precio final.
 * 
 * Es un servicio puro, no usa estado global, lo que facilita su reutilización
 * en distintos componentes (por ejemplo, CalculatorComponent).
 */
export const CalculationService = {
  /**
   * Envía los datos del cálculo al backend y obtiene el resultado.
   * 
   * @param data - Objeto que contiene:
   *   - `width`: ancho en metros
   *   - `height`: alto en metros
   *   - `materialType`: tipo de material (enum MaterialType)
   * 
   * @returns Un `CalculationResult` con:
   *   - `squareMeters`: superficie total
   *   - `totalPrice`: costo total (superficie × precio del material)
   * 
   * Usa `axios.post` con tipado genérico `<CalculationResult>` para garantizar
   * que la respuesta coincida con la estructura esperada del modelo.
   */
  calculate: async (data: CalculationInput): Promise<CalculationResult> => {
    // Enviamos la petición al backend con los datos de entrada
    const response = await axios.post<CalculationResult>(API_URL, data);

    // Retornamos únicamente la parte útil de la respuesta (el objeto CalculationResult)
    return response.data;
  }
};
