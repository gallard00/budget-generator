/**
 * ✅ Enumeración que define los distintos tipos de materiales
 * utilizados en los cálculos del presupuesto.
 * 
 * Cada valor del enum representa una categoría específica de material
 * que tiene un precio por metro cuadrado diferente en el sistema.
 * 
 * 🔹 Se utiliza principalmente dentro de `CalculationInput`
 * para asegurar que los materiales ingresados sean válidos y controlados.
 */
export enum MaterialType {
  /**
   * Porcelanato — material cerámico de alta resistencia y calidad.
   */
  PORCELANATO = 'PORCELANATO',

  /**
   * Piedra — recubrimiento natural o artificial utilizado en pisos y paredes.
   */
  PIEDRA = 'PIEDRA',

  /**
   * Mármol — material premium con alto costo por m².
   */
  MARMOL = 'MARMOL',

  /**
   * Revoque — mezcla aplicada a superficies para nivelar o revestir.
   */
  REVOQUE = 'REVOQUE'
}
