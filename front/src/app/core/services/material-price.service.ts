import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MaterialPriceService {

  private prices: Record<string, number> = {
    Porcelanato: 8000,
    Cerámica: 6000,
    Piedra: 9500,
    Mármol: 12000,
    Revoque: 5000
  };

  getPrice(material: string): number {
    return this.prices[material] ?? 0;
  }

  getAll(): string[] {
    return Object.keys(this.prices);
  }
}
