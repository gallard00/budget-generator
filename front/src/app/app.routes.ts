import { Routes } from '@angular/router';
import { ClientsComponent } from './features/clients/clients.component';
import { BudgetsComponent } from './features/budgets/budgets.component';
import { CalculatorComponent } from './features/calculator/calculator.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: '**', redirectTo: 'clients' }
];
