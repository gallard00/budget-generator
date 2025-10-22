import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from '../../core/services/shared-data.service';
import { BudgetItem } from '../../core/models/budget-item.model';

interface MaterialResult {
  squareMeters: number;
  totalPrice: number;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  input = { materialType: '', width: 0, height: 0 };
  loading = false;
  result: MaterialResult | null = null;

  materials: string[] = ['Porcelanato', 'Cerámica', 'Piedra', 'Mármol', 'Revoque'];
  materialPrices: Record<string, number> = {
    'Porcelanato': 8000,
    'Cerámica': 6000,
    'Piedra': 9500,
    'Mármol': 12000,
    'Revoque': 5000
  };

  previewItems: BudgetItem[] = [];
  totalGeneral = 0;

  constructor(private router: Router, private sharedData: SharedDataService) {}

  ngOnInit() {
    this.previewItems = this.sharedData.getItems();
    this.calculateTotal();
  }

  calculate() {
    if (!this.input.materialType || !this.input.width || !this.input.height) {
      alert('⚠️ Completá todos los campos.');
      return;
    }

    this.loading = true;
    setTimeout(() => {
      const squareMeters = this.input.width * this.input.height;
      const pricePerM2 = this.materialPrices[this.input.materialType];
      const totalPrice = squareMeters * pricePerM2;
      this.result = { squareMeters, totalPrice };
      this.loading = false;
    }, 400);
  }

  sendToBudget() {
    if (!this.result || !this.input.materialType) return;

    const item: BudgetItem = {
      description: `${this.input.materialType} (${this.result.squareMeters.toFixed(2)} m²)`,
      quantity: this.result.squareMeters,
      unitPrice: this.materialPrices[this.input.materialType]
    };

    this.sharedData.addItem(item);
    this.previewItems.push(item);
    this.calculateTotal();

    alert('✅ Material agregado al presupuesto');
    this.reset();
  }

  removeItem(index: number) {
    this.previewItems.splice(index, 1);
    this.sharedData.removeItem(index);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalGeneral = this.previewItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
  }

  goToBudget() {
    this.router.navigate(['/budgets']);
  }

  reset() {
    this.input = { materialType: '', width: 0, height: 0 };
    this.result = null;
  }
}
