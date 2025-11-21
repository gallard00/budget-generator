// ✅ Importaciones base del enrutador de Angular
import { Routes } from '@angular/router';

// ✅ Importación de los componentes que se usarán en las rutas
import { ClientsComponent } from './features/clients/clients.component';
import { BudgetsComponent } from './features/budgets/budgets.component';
import { CalculatorComponent } from './features/calculator/calculator.component';
import { Login } from './features/auth/login/login.component';
import { Register } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';

/**
 * 🗺️ Configuración de rutas principales de la aplicación
 */
export const routes: Routes = [

  // Ruta raíz: redirige a /clients
  { path: '', redirectTo: '/clients', pathMatch: 'full' },

  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },

  // 👥 Clientes
  { path: 'clients', canActivate: [authGuard], component: ClientsComponent },

  // 💰 Presupuestos
  { path: 'budgets', canActivate: [authGuard], component: BudgetsComponent },

  // 📜 Historial de un presupuesto (lazy load de componente standalone)
  {
    path: 'budgets/:id/history',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/budgets/budget-history.component')
        .then(m => m.BudgetHistoryComponent)
  },

  // 🧮 Calculadora
  { path: 'calculator', canActivate: [authGuard], component: CalculatorComponent },

  // Ruta comodín → redirige a /clients
  { path: '**', redirectTo: '/clients' }
];
