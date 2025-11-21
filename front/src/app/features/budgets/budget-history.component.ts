import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BudgetService } from '../../core/services/budget.service';
import { BudgetHistory } from '../../core/models/budget-history.model';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente para visualizar el historial de cambios
 * de un presupuesto específico.
 */
@Component({
  selector: 'app-budget-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './budget-history.component.html',
  styleUrls: ['./budget-history.component.scss']
})
export class BudgetHistoryComponent implements OnInit {

  budgetId!: number;
  history: BudgetHistory[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.budgetId = Number(this.route.snapshot.paramMap.get('id'));

    this.budgetService.getHistory(this.budgetId).subscribe({
      next: res => {
        this.history = res;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading history:', err);
        this.loading = false;
      }
    });
  }
}
