import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

/**
 * Componente de inicio de sesión.
 * 
 * Responsabilidades (SRP):
 * - Recibir credenciales del usuario.
 * - Invocar AuthService para autenticar.
 * - Guardar token y redirigir a la aplicación.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html'
})
export class Login {
  email = '';
  password = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/clients']); // redirección correcta post-login
      },
      error: () => alert('❌ Error al iniciar sesión. Verifique las credenciales.')
    });
  }
}
