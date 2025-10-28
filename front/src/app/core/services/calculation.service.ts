import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculationInput } from '../models/calculation-input.model';
import { CalculationResult } from '../models/calculation-result.model';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8080/api/calc';

  calculate(data: CalculationInput) {
    return this.http.post<CalculationResult>(this.API_URL, data);
  }
}

