import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio de autenticación:
 * login, registro, manejo de token y roles.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/auth';

  /** Token JWT reactivo (signal). */
  token = signal<string | null>(localStorage.getItem('token'));

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password });
  }

  saveToken(token: string) {
    this.token.set(token);
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    const t = this.token();
    return !!t && t.length > 10;
  }

  /**
   * Obtiene el rol desde el payload del JWT
   * ("ROLE_USER" / "ROLE_ADMIN").
   */
  getRole(): string | null {
    const t = this.token();
    if (!t) return null;

    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      const authorities = payload.authorities ?? payload.role ?? null;
      if (!authorities) return null;
      return Array.isArray(authorities) ? authorities[0] : authorities;
    } catch {
      return null;
    }
  }

  /** True si el usuario actual es ADMIN. */
  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('token');
  }
}

