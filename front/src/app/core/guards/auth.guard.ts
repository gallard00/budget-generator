import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Guard que protege rutas que requieren usuario autenticado.
 * Si no hay token válido, redirige al login.
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (!auth.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
