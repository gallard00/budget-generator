import { Injectable } from '@angular/core';

/**
 * Servicio responsable de todos los cálculos usados por la calculadora.
 * 
 * (SRP — Principio de Responsabilidad Única)
 * 
 * El componente CalculatorComponent no debe contener lógica matemática.
 */
@Injectable({ providedIn: 'root' })
export class CalculatorService {

  /**
   * Calcula el área total en metros cuadrados.
   */
  calculateArea(width: number, height: number): number {
    return Number((width * height).toFixed(2));
  }

  /**
   * Calcula el precio total en base a área y precio por m2.
   */
  calculateTotal(area: number, pricePerM2: number): number {
    return Number((area * pricePerM2).toFixed(2));
  }
}
