import axios from 'axios';
import { Budget } from '../models/budget.model';

const API_URL = 'http://localhost:8080/api/budgets';

export const BudgetService = {
  getAll: async () => (await axios.get<Budget[]>(API_URL)).data,
  create: async (data: Budget) => (await axios.post<Budget>(API_URL, data)).data,
  exportPdf: async (id: number) => {
    const response = await axios.get(`${API_URL}/export/${id}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

