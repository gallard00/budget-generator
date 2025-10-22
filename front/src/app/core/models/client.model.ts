/**
 * ✅ Representa a un cliente dentro del sistema de presupuestos.
 * 
 * Cada cliente puede tener uno o varios presupuestos asociados,
 * por lo que esta entidad es fundamental para identificar al destinatario
 * de cada presupuesto.
 */
export interface Client {
  /**
   * Identificador único del cliente.
   * Es opcional porque el backend lo genera automáticamente al guardar.
   */
  id?: number;

  /**
   * Nombre completo del cliente.
   */
  name: string;

  /**
   * Número de teléfono de contacto.
   * Se almacena como string para permitir formatos con prefijos o espacios.
   */
  phone: string;

  /**
   * Dirección del cliente (calle, número, ciudad, etc.).
   */
  address: string;
}
