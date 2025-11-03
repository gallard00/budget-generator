import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BudgetService } from '../../core/services/budget.service';
import { ClientService } from '../../core/services/client.service';

import { Budget } from '../../core/models/budget.model';
import { Client } from '../../core/models/client.model';
import { BudgetItem } from '../../core/models/budget-item.model';

import { SafeUrlPipe } from '../../shared/components/pipes/safe-url.pipe';
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

  newItem = { description: '', quantity: 1, unitPrice: 0 };

  // edición
  editId: number | null = null;
  editModel: Partial<Budget> = {};

  pdfUrl: string | null = null;
  isLoadingPdf = false;

  constructor(
    private sharedData: SharedDataService,
    private clientService: ClientService,
    private budgetService: BudgetService,
    public auth: AuthService
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

  loadBudgets() {
    this.budgetService.getAll().subscribe(res => this.budgets = res);
  }

  loadClients() {
    this.clientService.getAll().subscribe(res => this.clients = res);
  }

  addItem() {
    this.newBudget.items.push({ ...this.newItem });
    this.newItem = { description: '', quantity: 1, unitPrice: 0 };
  }

  removeItem(i: number) {
    this.newBudget.items.splice(i, 1);
  }

  createBudget() {
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
  startEdit(b: Budget) {
    if (!this.auth.isAdmin()) return;
    this.editId = b.id!;
    this.editModel = { clientId: b.clientId, date: b.date };
  }

  cancelEdit() {
    this.editId = null;
    this.editModel = {};
  }

  saveEdit() {
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
  deleteBudget(id: number) {
    if (!this.auth.isAdmin()) return;
    this.budgetService.delete(id).subscribe({
      next: () => this.loadBudgets(),
      error: err => console.error('Error deleting budget:', err)
    });
  }

  openPdfModal(budgetId: number) {
    this.budgetService.exportPdf(budgetId).subscribe({
      error: err => {
        console.error('Error loading PDF:', err);
        alert('❌ Error loading PDF.');
      }
    });
  }

  closePdfModal() {
    if (this.pdfUrl) {
      window.URL.revokeObjectURL(this.pdfUrl);
      this.pdfUrl = null;
    }
  }
}

