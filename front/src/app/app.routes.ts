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
 * 
 * Este arreglo `routes` define las rutas del router Angular.
 * 
 * Cada objeto dentro del array representa una ruta con:
 * - `path`: la URL visible en el navegador.
 * - `component`: el componente que se renderiza al navegar a esa ruta.
 * 
 * ⚡ Angular Standalone elimina la necesidad de un `RouterModule.forRoot()`
 * ya que las rutas se proveen directamente en `app.config.ts` mediante `provideRouter(routes)`.
 */
export const routes: Routes = [

  /**
   * 🏠 Ruta raíz ('')
   * 
   * Cuando el usuario entra a la raíz (`http://localhost:4200/`),
   * Angular redirige automáticamente a `/clients`.
   * 
   * - `redirectTo`: indica hacia dónde redirigir.
   * - `pathMatch: 'full'`: garantiza que la coincidencia sea exacta (no parcial).
   */
  { path: '', redirectTo: '/clients', pathMatch: 'full' },

  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },

  /**
   * 👥 Ruta /clients
   * 
   * Muestra el componente `ClientsComponent`, donde se listan, crean y eliminan clientes.
   * 
   * Ejemplo:
   * - URL: http://localhost:4200/clients
   * - Renderiza el formulario + tabla de clientes.
   */
  { path: 'clients', canActivate: [authGuard], component: ClientsComponent },

  /**
   * 💰 Ruta /budgets
   * 
   * Muestra el componente `BudgetsComponent`, que gestiona los presupuestos.
   * 
   * Ejemplo:
   * - URL: http://localhost:4200/budgets
   * - Permite crear presupuestos, ver totales y exportar a PDF.
   */
  { path: 'budgets', canActivate: [authGuard], component: BudgetsComponent },

  /**
   * 🧮 Ruta /calculator
   * 
   * Abre el componente `CalculatorComponent`, la calculadora de materiales.
   * 
   * Ejemplo:
   * - URL: http://localhost:4200/calculator
   * - Permite calcular m², precios y enviar resultados al presupuesto.
   */
  { path: 'calculator', canActivate: [authGuard], component: CalculatorComponent },

  /**
   * 🚧 Ruta comodín '**'
   * 
   * Captura cualquier ruta no definida y redirige al listado de clientes.
   * 
   * Ejemplo:
   * - Si el usuario entra a /algo-que-no-existe → redirige a /clients
   * 
   * 💡 Buena práctica para evitar errores 404.
   */
  { path: '**', redirectTo: '/clients' }
];
