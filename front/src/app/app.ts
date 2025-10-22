import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="container mt-4">
      <h1 class="text-center text-primary mb-4">Budget Generator</h1>

      <nav class="mb-4 d-flex justify-content-center gap-3">
        <a routerLink="/clients" routerLinkActive="active" class="btn btn-outline-primary">Clients</a>
        <a routerLink="/budgets" routerLinkActive="active" class="btn btn-outline-success">Budgets</a>
        <a routerLink="/calculator" routerLinkActive="active" class="btn btn-outline-warning">Calculator</a>
      </nav>

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front');
}

