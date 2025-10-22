// ✅ Importaciones principales de Angular
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// ✅ Importamos el archivo de rutas del proyecto
import { routes } from './app.routes';

/**
 * ⚙️ appConfig
 * 
 * Este archivo reemplaza al antiguo `AppModule` en las versiones modernas de Angular.
 * En lugar de declarar imports y providers dentro de un módulo,
 * ahora Angular usa una configuración central de tipo `ApplicationConfig`.
 * 
 * Esta configuración se pasa directamente al método `bootstrapApplication(App, appConfig)` en main.ts.
 */
export const appConfig: ApplicationConfig = {

  /**
   * 🧩 providers
   * 
   * Es un array de “servicios globales” que se proveen a toda la aplicación.
   * Aquí se registran los proveedores de rutas, HTTP, detección de cambios, errores, etc.
   */
  providers: [

    /**
     * 🧠 provideBrowserGlobalErrorListeners()
     * 
     * Este provider agrega listeners globales para capturar errores de la aplicación.
     * Permite registrar, interceptar o monitorear errores no manejados.
     * Es útil para debugging o para servicios de monitoreo (como Sentry o Firebase Crashlytics).
     */
    provideBrowserGlobalErrorListeners(),

    /**
     * ⚡ provideZoneChangeDetection({ eventCoalescing: true })
     * 
     * Configura el sistema de detección de cambios de Angular (Zone.js).
     * 
     * - `eventCoalescing: true` optimiza el rendimiento agrupando varios eventos DOM
     *   antes de ejecutar detección de cambios.
     * - Esto reduce la cantidad de ciclos de render innecesarios.
     * 
     * 💡 Ideal para apps grandes como la tuya, donde se hacen muchas interacciones en formularios.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * 🌐 provideHttpClient(withInterceptorsFromDi())
     * 
     * Registra el cliente HTTP globalmente (HttpClient) para realizar peticiones a APIs REST.
     * 
     * - `withInterceptorsFromDi()` habilita el uso de interceptores HTTP declarados en el contenedor DI.
     *   Esto permite agregar lógica centralizada a las peticiones (tokens JWT, logs, etc.).
     * 
     * 💡 En tu caso, como usás Axios para la mayoría de requests, este provider es opcional,
     * pero lo mantenés por compatibilidad y escalabilidad futura.
     */
    provideHttpClient(withInterceptorsFromDi()),

    /**
     * 🚏 provideRouter(routes)
     * 
     * Registra el sistema de enrutamiento (router) de Angular.
     * Le pasamos la configuración de rutas definida en `app.routes.ts`.
     * 
     * Gracias a esto, Angular sabe cómo mapear cada ruta de URL a su componente standalone.
     */
    provideRouter(routes)
  ]
};

