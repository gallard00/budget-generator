// ✅ Importaciones de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// ✅ Importamos el servicio compartido (para enviar ítems al presupuesto)
import { SharedDataService } from '../../core/services/shared-data.service';

// ✅ Importamos el modelo que representa cada ítem de presupuesto
import { BudgetItem } from '../../core/models/budget-item.model';

// ✅ Interfaz interna del componente para representar el resultado del cálculo
interface MaterialResult {
  squareMeters: number; // Superficie total calculada
  totalPrice: number;   // Precio total en base al material y superficie
}

@Component({
  selector: 'app-calculator',           // Nombre del selector del componente
  standalone: true,                     // Componente independiente (sin módulo)
  imports: [CommonModule, FormsModule], // Se importan los módulos necesarios
  templateUrl: './calculator.component.html', // Template asociado
  styleUrls: ['./calculator.component.scss']  // Estilos propios
})
export class CalculatorComponent implements OnInit {

  /**
   * 📐 Datos de entrada del usuario
   * materialType → tipo de material seleccionado
   * width / height → medidas para calcular metros cuadrados
   */
  input = { materialType: '', width: 0, height: 0 };

  // ⏳ Estado de carga para mostrar feedback durante el cálculo
  loading = false;

  // 💡 Resultado del cálculo actual (metros cuadrados y total)
  result: MaterialResult | null = null;

  // 🧱 Lista de materiales disponibles para elegir
  materials: string[] = ['Porcelanato', 'Cerámica', 'Piedra', 'Mármol', 'Revoque'];

  /**
   * 💰 Precios de referencia por metro cuadrado de cada material
   * Se usa un objeto tipo Record para asociar el nombre del material a su valor.
   */
  materialPrices: Record<string, number> = {
    'Porcelanato': 8000,
    'Cerámica': 6000,
    'Piedra': 9500,
    'Mármol': 12000,
    'Revoque': 5000
  };

  /**
   * 📋 Lista temporal de ítems agregados (para vista previa)
   * Muestra en pantalla los materiales calculados antes de enviarlos al presupuesto.
   */
  previewItems: BudgetItem[] = [];

  // 💵 Total acumulado de todos los materiales calculados
  totalGeneral = 0;

  /**
   * 🔧 Constructor del componente
   * - `Router`: permite navegar hacia el componente de Budgets.
   * - `SharedDataService`: permite compartir los ítems calculados con BudgetsComponent.
   */
  constructor(private router: Router, private sharedData: SharedDataService) {}

  /**
   * 🧠 Ciclo de vida OnInit
   * 
   * Al iniciar el componente:
   * - Carga ítems previos desde el SharedDataService (si los hay).
   * - Calcula el total general acumulado.
   */
  ngOnInit() {
    this.previewItems = this.sharedData.getItems();
    this.calculateTotal();
  }

  /**
   * 📏 Realiza el cálculo de metros cuadrados y precio total
   * 
   * - Verifica que todos los campos estén completos.
   * - Simula un tiempo de procesamiento con `setTimeout` para mostrar un "loading".
   * - Calcula:
   *     → superficie total = ancho × alto
   *     → total = superficie × precio del material
   */
  calculate() {
    if (!this.input.materialType || !this.input.width || !this.input.height) {
      alert('⚠️ Completá todos los campos.');
      return;
    }

    this.loading = true;
    setTimeout(() => {
      const squareMeters = this.input.width * this.input.height;
      const pricePerM2 = this.materialPrices[this.input.materialType];
      const totalPrice = squareMeters * pricePerM2;

      // Se guarda el resultado en el estado local
      this.result = { squareMeters, totalPrice };
      this.loading = false;
    }, 400);
  }

  /**
   * 🚀 Envía el resultado actual al presupuesto
   * 
   * - Crea un objeto `BudgetItem` con descripción, cantidad y precio unitario.
   * - Lo guarda en el SharedDataService (persistencia temporal).
   * - Lo agrega al array de vista previa `previewItems`.
   * - Recalcula el total general y limpia los campos.
   */
  sendToBudget() {
    if (!this.result || !this.input.materialType) return;

    const item: BudgetItem = {
      description: `${this.input.materialType} (${this.result.squareMeters.toFixed(2)} m²)`,
      quantity: this.result.squareMeters,
      unitPrice: this.materialPrices[this.input.materialType]
    };

    // ✅ Guardar en el servicio compartido
    this.sharedData.addItem(item);

    // ✅ Agregar a la vista previa local
    this.previewItems.push(item);
    this.calculateTotal();

    // Mensaje de confirmación visual
    alert('✅ Material agregado al presupuesto');

    // Limpiamos los campos para un nuevo cálculo
    this.reset();
  }

  /**
   * ❌ Elimina un ítem de la vista previa
   * 
   * - Remueve el elemento tanto del array local como del servicio compartido.
   * - Recalcula el total general.
   */
  removeItem(index: number) {
    this.previewItems.splice(index, 1);
    this.sharedData.removeItem(index);
    this.calculateTotal();
  }

  /**
   * 💰 Calcula el total general de todos los ítems agregados
   * 
   * Usa `reduce()` para acumular la suma de (cantidad × precio unitario) de cada ítem.
   */
  calculateTotal() {
    this.totalGeneral = this.previewItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
  }

  /**
   * 🔁 Navega al componente de presupuestos
   * 
   * Usa el `Router` para redirigir al usuario a la vista `/budgets`.
   * 
   * Los ítems se mantienen gracias al `SharedDataService` (sessionStorage).
   */
  goToBudget() {
    this.router.navigate(['/budgets']);
  }

  /**
   * 🧹 Reinicia los campos del formulario y el resultado actual
   * 
   * Se utiliza después de agregar un material al presupuesto.
   */
  reset() {
    this.input = { materialType: '', width: 0, height: 0 };
    this.result = null;
  }
}
