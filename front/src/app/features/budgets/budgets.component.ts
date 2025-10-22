import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../core/services/budget.service';
import { ClientService } from '../../core/services/client.service';
import { Budget } from '../../core/models/budget.model';
import { Client } from '../../core/models/client.model';
import { SafeUrlPipe } from '../../shared/components/pipes/safe-url.pipe';
import { SharedDataService } from '../../core/services/shared-data.service';
import { BudgetItem } from '../../core/models/budget-item.model';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
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

  pdfUrl: string | null = null;
  isLoadingPdf = false;

  constructor(private sharedData: SharedDataService) {}

  async ngOnInit() {
  await this.loadClients();
  await this.loadBudgets();

  // 🧩 1. Cargar todos los ítems guardados
  const savedItems = this.sharedData.getItems();
  if (savedItems.length > 0) {
    console.log('🟢 Cargando múltiples ítems desde sessionStorage:', savedItems);
    this.newBudget.items.push(...savedItems);
    this.sharedData.clear(); // limpiar para evitar duplicados
  }

  // 🧩 2. Escuchar actualizaciones en tiempo real
  this.sharedData.items$.subscribe((items: BudgetItem[]) => {
    if (items.length > 0) {
      console.log('📩 Recibidos en tiempo real:', items);
      this.newBudget.items = [...items];
    }
  });
}


  // ✅ 2. Recién después cargamos datos del backend
  async ngAfterViewInit() {
    await this.loadClients();
    await this.loadBudgets();
    // 🔹 ahora sí limpiamos
    setTimeout(() => this.sharedData.clear(), 300);
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
      alert('⚠️ Please select a client and add at least one item.');
      return;
    }

    try {
      await BudgetService.create(this.newBudget);
      alert('✅ Budget created successfully!');
      this.newBudget = {
        clientId: 0,
        date: new Date().toISOString().split('T')[0],
        items: []
      };
      await this.loadBudgets();
    } catch (err) {
      console.error('Error creating budget:', err);
      alert('❌ Error creating budget.');
    }
  }

  async openPdfModal(budgetId: number) {
    try {
      await BudgetService.exportPdf(budgetId);
    } catch (err) {
      console.error('Error loading PDF:', err);
      alert('❌ Error loading PDF.');
    }
  }

  closePdfModal() {
  if (this.pdfUrl) {
    window.URL.revokeObjectURL(this.pdfUrl);
    this.pdfUrl = null;
  }
  console.log('🧹 PDF modal cerrado y URL liberada');
}
}
