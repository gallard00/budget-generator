import axios from 'axios';
import { Client } from '../models/client.model';

const API_URL = 'http://localhost:8080/api/clients';

export const ClientService = {
  getAll: async () => (await axios.get<Client[]>(API_URL)).data,
  create: async (data: Client) => (await axios.post<Client>(API_URL, data)).data,
  delete: async (id: number) => await axios.delete(`${API_URL}/${id}`)
};
