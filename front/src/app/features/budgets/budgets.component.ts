import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BudgetService } from '../../core/services/budget.service';
import { ClientService } from '../../core/services/client.service';

import { Budget } from '../../core/models/budget.model';
import { Client } from '../../core/models/client.model';
import { BudgetItem } from '../../core/models/budget-item.model';

import { SharedDataService } from '../../core/services/shared-data.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente principal de gestión de presupuestos.
 * 
 * Responsabilidades:
 * - Listar presupuestos
 * - Crear nuevos presupuestos
 * - Editar datos básicos (cliente, fecha)
 * - Eliminar presupuestos (solo ADMIN)
 * - Disparar navegación a historial y PDF
 */
@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit, AfterViewInit {

  budgets: Budget[] = [];
  clients: Client[] = [];

  /** Modelo para creación de nuevo presupuesto */
  newBudget: Budget = {
    clientId: 0,
    date: new Date().toISOString().split('T')[0],
    items: []
  };

  /** Ítem en edición para agregar al nuevo presupuesto */
  newItem: BudgetItem = {
    description: '',
    quantity: 1,
    unitPrice: 0
  };

  /** Edición de presupuesto existente */
  editId: number | null = null;
  editModel: Partial<Budget> = {};

  constructor(
    private sharedData: SharedDataService,
    private clientService: ClientService,
    private budgetService: BudgetService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadBudgets();

    // Cargar ítems que vengan desde la Calculator
    const savedItems = this.sharedData.getItems();
    if (savedItems.length > 0) {
      this.newBudget.items.push(...savedItems);
    }

    // Escuchar cambios en items compartidos
    this.sharedData.items$.subscribe(items => {
      if (items.length > 0) {
        this.newBudget.items = [...items];
      }
    });
  }

  ngAfterViewInit(): void {
    // Limpia ítems compartidos después de usar Calculator
    setTimeout(() => this.sharedData.clear(), 300);
  }

  /** Carga presupuestos desde la API */
  loadBudgets(): void {
    this.budgetService.getAll().subscribe(res => this.budgets = res);
  }

  /** Carga clientes desde la API */
  loadClients(): void {
    this.clientService.getAll().subscribe(res => this.clients = res);
  }

  /** Agrega un ítem al nuevo presupuesto */
  addItem(): void {
    this.newBudget.items.push({ ...this.newItem });
    this.newItem = { description: '', quantity: 1, unitPrice: 0 };
  }

  /** Elimina un ítem del nuevo presupuesto por índice */
  removeItem(i: number): void {
    this.newBudget.items.splice(i, 1);
  }

  /** Crea un nuevo presupuesto */
  createBudget(): void {
    if (!this.newBudget.clientId || this.newBudget.items.length === 0) {
      alert('⚠️ Please select a client and add at least one item.');
      return;
    }

    this.budgetService.create(this.newBudget).subscribe({
      next: () => {
        alert('✅ Budget created successfully!');
        this.newBudget = {
          clientId: 0,
          date: new Date().toISOString().split('T')[0],
          items: []
        };
        this.loadBudgets();
      },
      error: err => {
        console.error('Error creating budget:', err);
        alert('❌ Error creating budget.');
      }
    });
  }

  // === ADMIN: EDIT ===

  startEdit(b: Budget): void {
    if (!this.auth.isAdmin()) return;
    this.editId = b.id!;
    this.editModel = { clientId: b.clientId, date: b.date };
  }

  cancelEdit(): void {
    this.editId = null;
    this.editModel = {};
  }

  saveEdit(): void {
    if (this.editId == null) return;

    this.budgetService.update(this.editId, this.editModel).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadBudgets();
      },
      error: err => console.error('Error updating budget:', err)
    });
  }

  // === ADMIN: DELETE ===

  deleteBudget(id: number): void {
    if (!this.auth.isAdmin()) return;

    this.budgetService.delete(id).subscribe({
      next: () => this.loadBudgets(),
      error: err => console.error('Error deleting budget:', err)
    });
  }

  /** Abre el PDF en una nueva pestaña */
  openPdfModal(budgetId: number): void {
    this.budgetService.exportPdf(budgetId).subscribe({
      error: err => {
        console.error('Error loading PDF:', err);
        alert('❌ Error loading PDF.');
      }
    });
  }

  /**
   * Navega a la pantalla de historial de un presupuesto.
   * Solo se muestra para ADMIN en la UI.
   */
  viewHistory(budgetId: number): void {
    if (!this.auth.isAdmin()) return;
    this.router.navigate(['/budgets', budgetId, 'history']);
  }
}


