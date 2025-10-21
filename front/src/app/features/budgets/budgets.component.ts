import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../core/services/budget.service';
import { ClientService } from '../../core/services/client.service';
import { Budget } from '../../core/models/budget.model';
import { Client } from '../../core/models/client.model';
import { SafeUrlPipe } from '../../shared/components/pipes/safe-url.pipe';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  clients: Client[] = [];
  newBudget: Budget = { clientId: 0, date: new Date().toISOString().split('T')[0], items: [] };

  newItem = { description: '', quantity: 1, unitPrice: 0 };

  // ✅ Variables para el modal PDF
  pdfUrl: string | null = null;
  isLoadingPdf = false;

  async ngOnInit() {
    await this.loadClients();
    await this.loadBudgets();
  }

  async loadBudgets() {
    this.budgets = await BudgetService.getAll();
  }

  

  async loadClients() {
    this.clients = await ClientService.getAll();
  }

  addItem() {
    this.newBudget.items.push({ ...this.newItem });
    this.newItem = { description: '', quantity: 1, unitPrice: 0 };
  }

  removeItem(i: number) {
    this.newBudget.items.splice(i, 1);
  }

  async createBudget() {
    if (!this.newBudget.clientId || this.newBudget.items.length === 0) {
    alert('Please select a client and add at least one item.');
    return;
  }

  try {
    await BudgetService.create(this.newBudget);
    alert('✅ Budget created successfully!');
    this.newBudget = { clientId: 0, date: new Date().toISOString().split('T')[0], items: [] };
    await this.loadBudgets();
  } catch (err) {
    console.error('Error creating budget:', err);
    alert('❌ Error creating budget.');
  }
  }

  // ✅ Abre el modal con el PDF
  async openPdfModal(budgetId: number) {
    this.isLoadingPdf = true;
    this.pdfUrl = null;

    try {
      const blob = await BudgetService.exportPdf(budgetId);
      this.pdfUrl = window.URL.createObjectURL(blob);
    } catch (err) {
      console.error('Error loading PDF:', err);
      alert('❌ Error loading PDF.');
    } finally {
      this.isLoadingPdf = false;
      const modal = document.getElementById('pdfModal');
      if (modal) {
        const modalInstance = new (window as any).bootstrap.Modal(modal);
        modalInstance.show();
      }
    }
  }

  // ✅ Cierra el modal y libera memoria
  closePdfModal() {
    if (this.pdfUrl) {
      window.URL.revokeObjectURL(this.pdfUrl);
      this.pdfUrl = null;
    }
  }
}
