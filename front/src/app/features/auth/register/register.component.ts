import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

/**
 * Componente de registro de nuevos usuarios.
 * 
 * Responsabilidades:
 * - Enviar datos al AuthService.
 * - Validar que se complete nombre, email y clave.
 * - Redirigir automáticamente al login tras registrarse.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class Register {
  name = '';
  email = '';
  password = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => {
        alert('✅ Registro exitoso');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        alert('❌ Error al registrarse.');
      }
    });
  }
}
