import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalculatorService } from '../../core/services/calculator.service';
import { SharedDataService } from '../../core/services/shared-data.service';

/**
 * Componente de la calculadora.
 * 
 * Responsabilidades:
 * - Capturar valores (ancho, alto, precio/m2)
 * - Delegar cálculos al CalculatorService
 * - Permitir enviar el resultado como ítem al módulo de Presupuestos
 */
@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  // inputs del usuario
  width = 0;
  height = 0;
  pricePerM2 = 0;

  // resultados
  area = 0;
  total = 0;

  constructor(
    private calcService: CalculatorService,
    private shared: SharedDataService
  ) {}

  /**
   * Calcula área y total delegando al servicio.
   */
  calculate(): void {
    this.area = this.calcService.calculateArea(this.width, this.height);
    this.total = this.calcService.calculateTotal(this.area, this.pricePerM2);
  }

  /**
   * Envía el resultado al módulo de presupuestos como ítem.
   */
  sendToBudget(): void {
    if (this.total <= 0) {
      alert('⚠️ Primero realizá un cálculo válido.');
      return;
    }

    this.shared.addItem({
      description: `Trabajo de ${this.area} m² (${this.width}x${this.height})`,
      quantity: 1,
      unitPrice: this.total
    });

    alert('✔️ Enviado al presupuesto');
  }

  /**
   * Resetea la calculadora.
   */
  reset(): void {
    this.width = 0;
    this.height = 0;
    this.pricePerM2 = 0;
    this.area = 0;
    this.total = 0;
  }
}
