// ✅ Importaciones esenciales de Angular
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * 🧩 Pipe personalizado: safeUrl
 * 
 * Este pipe se utiliza para "sanitizar" URLs y permitir que Angular las
 * interprete como seguras en elementos como `<iframe>` o `<embed>`.
 * 
 * 👉 Por defecto, Angular bloquea URLs dinámicas para prevenir ataques XSS
 * (Cross-Site Scripting). Este pipe sirve como excepción controlada,
 * asegurando que las URLs generadas en runtime (como PDFs blob) se puedan mostrar.
 */
@Pipe({
  name: 'safeUrl',     // Nombre que se usará en el template: {{ url | safeUrl }}
  standalone: true     // No depende de un módulo, se puede importar directamente
})
export class SafeUrlPipe implements PipeTransform {

  /**
   * 🧱 Constructor
   * 
   * - Inyecta el servicio `DomSanitizer` de Angular, que permite marcar
   *   contenido dinámico como "seguro" para el DOM.
   */
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * 🔄 Método transform()
   * 
   * - Recibe una URL (por ejemplo, la generada por `window.URL.createObjectURL()`).
   * - La pasa por el `DomSanitizer` para que Angular no la bloquee.
   * - Devuelve un `SafeResourceUrl`, que puede ser usado directamente en `[src]` de un `<iframe>`.
   * 
   * 💡 Ejemplo de uso:
   * ```html
   * <iframe [src]="pdfUrl | safeUrl" width="100%" height="600"></iframe>
   * ```
   */
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

