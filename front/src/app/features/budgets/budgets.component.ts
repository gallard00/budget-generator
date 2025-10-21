import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../core/services/budget.service';
import { ClientService } from '../../core/services/client.service';
import { Budget } from '../../core/models/budget.model';
import { Client } from '../../core/models/client.model';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  clients: Client[] = [];
  newBudget: Budget = { clientId: 0, date: new Date().toISOString().split('T')[0], items: [] };

  newItem = { description: '', quantity: 1, unitPrice: 0 };

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
}
