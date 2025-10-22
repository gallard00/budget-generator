// ✅ Importaciones principales
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * 🧩 Componente raíz de la aplicación Angular
 * 
 * Este componente (`App`) reemplaza al antiguo `AppComponent` usado junto con `AppModule`.
 * En Angular moderno (v15+), los componentes *standalone* no requieren módulos raíz.
 * 
 * 📌 Funciones principales:
 *  - Define la estructura base (layout general).
 *  - Contiene el `<router-outlet>` donde se renderizan las vistas.
 *  - Incluye la barra de navegación principal.
 */
@Component({
  selector: 'app-root',   // Etiqueta que se usa en index.html → <app-root></app-root>

  standalone: true,       // ✅ Componente independiente (no usa módulos)
  
  // 🧱 Imports locales para funcionalidad del router y plantillas básicas
  imports: [
    RouterOutlet,         // Permite renderizar los componentes según la ruta activa
    CommonModule,         // Provee directivas comunes como *ngIf, *ngFor, etc.
    RouterLink,           // Permite usar [routerLink] en los botones y enlaces
    RouterLinkActive      // Añade clases cuando una ruta está activa (para resaltar)
  ],

  /**
   * 🧠 Template inline
   * 
   * Define la estructura visual principal de la app:
   *  - Título
   *  - Barra de navegación (con botones de ruta)
   *  - Espacio para el contenido dinámico (router-outlet)
   */
  template: `
    <div class="container mt-4">
      <!-- 🏷️ Encabezado principal -->
      <h1 class="text-center text-primary mb-4">Budget Generator</h1>

      <!-- 🧭 Barra de navegación -->
      <nav class="mb-4 d-flex justify-content-center gap-3">
        <!-- 🔹 Botón para Clients -->
        <a routerLink="/clients" routerLinkActive="active" class="btn btn-outline-primary">Clients</a>
        
        <!-- 🔹 Botón para Budgets -->
        <a routerLink="/budgets" routerLinkActive="active" class="btn btn-outline-success">Budgets</a>
        
        <!-- 🔹 Botón para Calculator -->
        <a routerLink="/calculator" routerLinkActive="active" class="btn btn-outline-warning">Calculator</a>
      </nav>

      <!-- 📦 Aquí Angular renderiza la vista según la ruta activa -->
      <router-outlet></router-outlet>
    </div>
  `,

  // 📁 Archivo de estilos asociado
  styleUrl: './app.scss'
})

/**
 * 🧱 Clase principal del componente
 * 
 * - Define la lógica interna del componente raíz.
 * - En este caso, mantiene una señal `title` como ejemplo (puede usarse para reactive UI).
 */
export class App {
  /**
   * 💡 signal()
   * 
   * Los *signals* son parte de la nueva API reactiva de Angular (v16+).
   * 
   * - Similar a un BehaviorSubject, pero más eficiente y sin RxJS.
   * - Permite reaccionar automáticamente a cambios en su valor dentro del template.
   */
  protected readonly title = signal('front');
}

