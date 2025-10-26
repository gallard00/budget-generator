// Importamos Axios, la librería utilizada para realizar solicitudes HTTP.
import axios from 'axios';

// Importamos el modelo `Client` para tipar correctamente las respuestas del backend.
import { Client } from '../models/client.model';

/**
 * URL base del endpoint de clientes.
 * 
 * Este endpoint (`/api/clients`) es manejado por el backend y permite
 * realizar operaciones CRUD sobre la entidad `Client`.
 */
const API_URL = 'http://localhost:8080/api/clients';

/**
 * Servicio de Clientes
 * 
 * Este servicio encapsula todas las llamadas al backend relacionadas con
 * la entidad `Client`.  
 * Cumple con el principio de responsabilidad única (SRP) dentro de la arquitectura,
 * delegando al backend la persistencia y gestión de datos.
 */
export const ClientService = {
  /**
   * Obtiene todos los clientes registrados en el sistema.
   * 
   * - Realiza una solicitud GET al endpoint `/api/clients`.
   * - Tipamos la respuesta como `Client[]` para garantizar consistencia con el modelo.
   * - Retorna directamente la propiedad `.data` del objeto de respuesta HTTP.
   */
  getAll: async () => (await axios.get<Client[]>(API_URL)).data,

  /**
   * Crea un nuevo cliente en la base de datos.
   * 
   * @param data - Objeto `Client` con los datos del cliente a crear.
   * 
   * - Envía una solicitud POST al endpoint `/api/clients`.
   * - Retorna el cliente creado con su `id` asignado por el backend.
   */
  create: async (data: Client) => (await axios.post<Client>(API_URL, data)).data,

  /**
   * Elimina un cliente según su ID.
   * 
   * @param id - Identificador numérico del cliente a eliminar.
   * 
   * - Realiza una solicitud DELETE al endpoint `/api/clients/{id}`.
   * - No retorna datos, sólo ejecuta la eliminación en el backend.
   */
  delete: async (id: number) => await axios.delete(`${API_URL}/${id}`)
};
