import axios from 'axios';
import { Budget } from '../models/budget.model';

const BASE_URL = 'http://localhost:8080/api';
const BUDGET_URL = `${BASE_URL}/budgets`;
const EXPORT_URL = `${BASE_URL}/export/pdf`;

export const BudgetService = {
  getAll: async () => (await axios.get<Budget[]>(BUDGET_URL)).data,

  create: async (data: Budget) => (await axios.post<Budget>(BUDGET_URL, data)).data,

  // ✅ Exportar a PDF (abre o descarga)
  exportPdf: async (id: number) => {
    const response = await axios.get(`${EXPORT_URL}/${id}`, {
      responseType: 'blob',
    });

    // ✅ Crear URL temporal y abrir nueva pestaña
    const fileURL = window.URL.createObjectURL(response.data);
    window.open(fileURL, '_blank');

    return response.data;
  },
};
