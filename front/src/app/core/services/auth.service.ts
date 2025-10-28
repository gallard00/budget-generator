import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/auth';

  // Signal con el token
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

  // Lee el payload del JWT y devuelve el rol ("ROLE_USER"/"ROLE_ADMIN")
  getRole(): string | null {
    const t = this.token();
    if (!t) return null;
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      // Puede venir como "authorities" (array) o "role" (string) según tu JwtUtil
      const authorities = payload.authorities ?? payload.role ?? null;
      if (!authorities) return null;
      return Array.isArray(authorities) ? authorities[0] : authorities;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('token');
  }
}
