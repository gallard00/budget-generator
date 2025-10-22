// ✅ Importaciones principales de Angular
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ✅ Importación de servicios que gestionan la lógica de negocio
import { BudgetService } from '../../core/services/budget.service';
import { ClientService } from '../../core/services/client.service';

// ✅ Modelos de datos
import { Budget } from '../../core/models/budget.model';
import { Client } from '../../core/models/client.model';
import { BudgetItem } from '../../core/models/budget-item.model';

// ✅ Pipe personalizado para mostrar PDF de forma segura en iframe
import { SafeUrlPipe } from '../../shared/components/pipes/safe-url.pipe';

// ✅ Servicio para compartir ítems entre Calculator → Budgets
import { SharedDataService } from '../../core/services/shared-data.service';

@Component({
  selector: 'app-budgets', // Nombre del selector del componente
  standalone: true,        // Define que es un componente independiente (sin módulo)
  imports: [CommonModule, FormsModule, SafeUrlPipe], // Módulos necesarios para el template
  templateUrl: './budgets.component.html',           // Plantilla HTML asociada
  styleUrls: ['./budgets.component.scss']            // Estilos CSS específicos
})
export class BudgetsComponent implements OnInit, AfterViewInit {
  // 📊 Lista de presupuestos existentes (traídos del backend)
  budgets: Budget[] = [];

  // 👤 Lista de clientes disponibles (traídos del backend)
  clients: Client[] = [];

  // 🧾 Modelo del nuevo presupuesto que se está creando
  newBudget: Budget = {
    clientId: 0,                                         // Cliente seleccionado
    date: new Date().toISOString().split('T')[0],        // Fecha actual por defecto (formato yyyy-MM-dd)
    items: []                                            // Lista vacía de ítems
  };

  // 🧩 Ítem temporal que se está cargando manualmente
  newItem = { description: '', quantity: 1, unitPrice: 0 };

  // 📄 Variables para manejo del PDF
  pdfUrl: string | null = null;   // URL del PDF generado
  isLoadingPdf = false;           // Bandera para mostrar spinner durante la carga

  // ✅ Inyección del servicio compartido (para comunicación entre componentes)
  constructor(private sharedData: SharedDataService) {}

  /**
   * 🟢 Método del ciclo de vida: se ejecuta cuando el componente se inicializa.
   * 
   * 1. Carga los clientes y presupuestos del backend.
   * 2. Recupera ítems almacenados en `SharedDataService` (desde Calculator).
   * 3. Escucha actualizaciones reactivas de ítems nuevos en tiempo real.
   */
  async ngOnInit() {
    await this.loadClients();
    await this.loadBudgets();

    // 🧩 1. Cargar todos los ítems guardados en sessionStorage
    const savedItems = this.sharedData.getItems();
    if (savedItems.length > 0) {
      console.log('🟢 Cargando múltiples ítems desde sessionStorage:', savedItems);
      // Agregamos los ítems guardados al presupuesto actual
      this.newBudget.items.push(...savedItems);
      // Limpiamos el estado compartido para evitar duplicados
      this.sharedData.clear();
    }

    // 🧩 2. Suscripción a actualizaciones en tiempo real del SharedDataService
    this.sharedData.items$.subscribe((items: BudgetItem[]) => {
      if (items.length > 0) {
        console.log('📩 Recibidos en tiempo real:', items);
        // Actualizamos la lista de ítems del presupuesto actual
        this.newBudget.items = [...items];
      }
    });
  }

  /**
   * 🧠 AfterViewInit:
   * 
   * Se ejecuta después de que la vista fue renderizada.
   * Vuelve a cargar clientes y presupuestos del backend,
   * y luego limpia el SharedDataService para evitar persistencias innecesarias.
   */
  async ngAfterViewInit() {
    await this.loadClients();
    await this.loadBudgets();

    // 🔹 Pequeño retraso antes de limpiar (para evitar eliminar ítems antes de ser mostrados)
    setTimeout(() => this.sharedData.clear(), 300);
  }

  /**
   * 🔄 Llama al backend para obtener todos los presupuestos existentes.
   */
  async loadBudgets() {
    this.budgets = await BudgetService.getAll();
  }

  /**
   * 👥 Llama al backend para obtener todos los clientes registrados.
   */
  async loadClients() {
    this.clients = await ClientService.getAll();
  }

  /**
   * ➕ Agrega un ítem manualmente al nuevo presupuesto.
   * 
   * - Clona el objeto `newItem` (para evitar referencias).
   * - Lo agrega a `newBudget.items`.
   * - Limpia los campos del formulario de ítem.
   */
  addItem() {
    this.newBudget.items.push({ ...this.newItem });
    this.newItem = { description: '', quantity: 1, unitPrice: 0 };
  }

  /**
   * 🗑️ Elimina un ítem del presupuesto actual según su índice.
   */
  removeItem(i: number) {
    this.newBudget.items.splice(i, 1);
  }

  /**
   * 💾 Envía el presupuesto actual al backend.
   * 
   * - Verifica que haya un cliente y al menos un ítem cargado.
   * - Si todo está correcto, realiza una petición POST.
   * - Limpia el formulario y recarga los presupuestos desde el servidor.
   */
  async createBudget() {
    if (!this.newBudget.clientId || this.newBudget.items.length === 0) {
      alert('⚠️ Please select a client and add at least one item.');
      return;
    }

    try {
      await BudgetService.create(this.newBudget);
      alert('✅ Budget created successfully!');
      
      // Reiniciamos el formulario
      this.newBudget = {
        clientId: 0,
        date: new Date().toISOString().split('T')[0],
        items: []
      };

      // Recargamos la lista de presupuestos del backend
      await this.loadBudgets();
    } catch (err) {
      console.error('Error creating budget:', err);
      alert('❌ Error creating budget.');
    }
  }

  /**
   * 📄 Genera y abre el PDF de un presupuesto específico.
   * 
   * - Llama al método `exportPdf()` del servicio.
   * - Este método abre una nueva pestaña con el PDF generado en el backend.
   */
  async openPdfModal(budgetId: number) {
    try {
      await BudgetService.exportPdf(budgetId);
    } catch (err) {
      console.error('Error loading PDF:', err);
      alert('❌ Error loading PDF.');
    }
  }

  /**
   * ❎ Cierra el modal del PDF y libera la URL creada con `createObjectURL`.
   * 
   * Esto evita pérdidas de memoria al eliminar blobs temporales.
   */
  closePdfModal() {
    if (this.pdfUrl) {
      window.URL.revokeObjectURL(this.pdfUrl);
      this.pdfUrl = null;
    }
    console.log('🧹 PDF modal cerrado y URL liberada');
  }
}

