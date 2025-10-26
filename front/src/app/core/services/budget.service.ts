// Importamos Axios, la librería usada para hacer peticiones HTTP al backend.
import axios from 'axios';

// Importamos el modelo `Budget` para tipar correctamente las respuestas.
import { Budget } from '../models/budget.model';

/**
 * Definición de las URLs base del backend.
 * 
 * `BASE_URL` apunta a la API principal.
 * A partir de ella, construimos endpoints específicos para los presupuestos (budgets)
 * y para la exportación en PDF.
 */
const BASE_URL = 'http://localhost:8080/api';
const BUDGET_URL = `${BASE_URL}/budgets`;
const EXPORT_URL = `${BASE_URL}/export/pdf`;

/**
 * Servicio de presupuestos
 * 
 * Contiene métodos asíncronos que gestionan las operaciones CRUD relacionadas con
 * los presupuestos (`budgets`), así como la exportación de presupuestos en formato PDF.
 */
export const BudgetService = {
  /**
   * Obtiene todos los presupuestos almacenados en el backend.
   * 
   * - Utiliza `axios.get()` para hacer una solicitud GET al endpoint `/api/budgets`.
   * - Tipamos la respuesta como un array de `Budget[]`.
   * - Retorna directamente el `data` de la respuesta HTTP.
   */
  getAll: async () => (await axios.get<Budget[]>(BUDGET_URL)).data,

  /**
   * Crea un nuevo presupuesto.
   * 
   * - Recibe un objeto `Budget` como parámetro (enviado desde el front).
   * - Envía el presupuesto al backend mediante una solicitud POST a `/api/budgets`.
   * - Retorna el objeto `Budget` que el backend haya guardado (incluyendo su nuevo `id`).
   */
  create: async (data: Budget) => (await axios.post<Budget>(BUDGET_URL, data)).data,

  /**
   * Exporta un presupuesto a PDF y lo abre automáticamente en una nueva pestaña.
   * 
   * - Llama al endpoint `/api/export/pdf/{id}` pasando el ID del presupuesto.
   * - Usa `responseType: 'blob'` para recibir el archivo binario (PDF).
   * - Crea un objeto URL temporal (`createObjectURL`) que representa el PDF en memoria.
   * - Abre el PDF en una nueva pestaña del navegador (`window.open`).
   * - Retorna el blob por si se quiere usar en otra parte (descargar manualmente, etc.).
   */
  exportPdf: async (id: number) => {
    const response = await axios.get(`${EXPORT_URL}/${id}`, {
      responseType: 'blob', // ⚠️ Importante: necesario para recibir binarios (PDF)
    });

    // Genera una URL temporal con el contenido binario del PDF
    const fileURL = window.URL.createObjectURL(response.data);

    // Abre el PDF en una nueva pestaña del navegador
    window.open(fileURL, '_blank');

    // Retorna el archivo binario (útil si luego queremos guardarlo o mostrarlo embebido)
    return response.data;
  },
};
