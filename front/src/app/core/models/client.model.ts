/**
 * Cliente del sistema de presupuestos.
 */
export interface Client {
  /** ID generado por el backend. */
  id?: number;

  /** Nombre completo del cliente. */
  name: string;

  /** Teléfono de contacto (string para distintos formatos). */
  phone: string;

  /** Dirección del cliente. */
  address: string;
}

