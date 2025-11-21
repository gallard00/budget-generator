/**
 * Usuario autenticado en el sistema.
 * Coincide con la estructura básica del backend.
 */
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: string; // "ROLE_USER" | "ROLE_ADMIN"
}

