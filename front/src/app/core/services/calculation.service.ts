import axios from 'axios';
import { CalculationInput } from '../models/calculation-input.model';
import { CalculationResult } from '../models/calculation-result.model';

const API_URL = 'http://localhost:8080/api/calc';

export const CalculationService = {
  calculate: async (data: CalculationInput): Promise<CalculationResult> => {
    const response = await axios.post<CalculationResult>(API_URL, data);
    return response.data;
  }
};
