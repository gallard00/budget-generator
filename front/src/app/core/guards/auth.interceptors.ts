import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor que agrega el token JWT en el header Authorization
 * para todas las peticiones HTTP salientes.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }

  return next(req);
};
