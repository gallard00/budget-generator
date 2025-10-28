// ✅ Importaciones principales
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="container mt-4">
      <h1 class="text-center text-primary mb-4">Budget Generator</h1>

      <!-- Menú solo si está logueado -->
      <ng-container *ngIf="auth.isLoggedIn()">
        <nav class="mb-4 d-flex justify-content-center gap-3">
          <a routerLink="/clients" routerLinkActive="active" class="btn btn-outline-primary">Clients</a>
          <a routerLink="/budgets" routerLinkActive="active" class="btn btn-outline-success">Budgets</a>

          <!-- Solo ADMIN ve Calculator -->
          <a *ngIf="auth.isAdmin()" routerLink="/calculator" routerLinkActive="active" class="btn btn-outline-warning">
            Calculator
          </a>

          <button class="btn btn-danger" (click)="logout()">Logout</button>
        </nav>
      </ng-container>

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
    window.location.href = '/auth/login';
  }

  protected readonly title = signal('front');
}


