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

  newBudget: Budget = {
    clientId: 0,
    date: new Date().toISOString().split('T')[0],
    items: []
  };

  newItem: BudgetItem = {
    description: '',
    quantity: 1,
    unitPrice: 0
  };

  // === MODAL EDICIÓN ===
  showEditModal = false;
  editId: number | null = null;
  editBudget: Partial<Budget> = { items: [] };

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

    const savedItems = this.sharedData.getItems();
    if (savedItems.length > 0) {
      this.newBudget.items.push(...savedItems);
    }

    this.sharedData.items$.subscribe(items => {
      if (items.length > 0) {
        this.newBudget.items = [...items];
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.sharedData.clear(), 300);
  }

  loadBudgets(): void {
    this.budgetService.getAll().subscribe(res => this.budgets = res);
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(res => this.clients = res);
  }

  addItem(): void {
    this.newBudget.items.push({ ...this.newItem });
    this.newItem = { description: '', quantity: 1, unitPrice: 0 };
  }

  removeItem(i: number): void {
    this.newBudget.items.splice(i, 1);
  }

  createBudget(): void {
    if (!this.newBudget.clientId || this.newBudget.items.length === 0) return;

    this.budgetService.create(this.newBudget).subscribe(() => {
      this.newBudget = {
        clientId: 0,
        date: new Date().toISOString().split('T')[0],
        items: []
      };
      this.loadBudgets();
    });
  }

  // ===== MODAL EDICIÓN =====

  openEditModal(b: Budget): void {
    if (!this.auth.isAdmin()) return;

    this.editId = b.id!;
    this.editBudget = {
      clientId: b.clientId,
      date: b.date,
      items: b.items.map(i => ({ ...i }))
    };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editBudget = { items: [] };
    this.editId = null;
  }

  addItemToEdit(): void {
    this.editBudget.items!.push({
      description: '',
      quantity: 1,
      unitPrice: 0
    });
  }

  removeItemFromEdit(i: number): void {
    this.editBudget.items!.splice(i, 1);
  }

  saveBudgetFromModal(): void {
    if (!this.editId) return;

    this.budgetService.update(this.editId, this.editBudget).subscribe(() => {
      this.closeEditModal();
      this.loadBudgets();

      // 🔄 regenerar PDF
      this.budgetService.exportPdf(this.editId!).subscribe();
    });
  }

  deleteBudget(id: number): void {
    if (!this.auth.isAdmin()) return;

    this.budgetService.delete(id).subscribe(() => this.loadBudgets());
  }

  openPdfModal(budgetId: number): void {
    this.budgetService.exportPdf(budgetId).subscribe();
  }

  viewHistory(budgetId: number): void {
    if (!this.auth.isAdmin()) return;
    this.router.navigate(['/budgets', budgetId, 'history']);
  }
}
