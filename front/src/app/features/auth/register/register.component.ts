import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

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
  auth = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => {
        alert('Registro exitoso');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrarse');
      }
    });
  }
}