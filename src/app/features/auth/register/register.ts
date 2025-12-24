import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Додано RouterLink
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    // Важливо: AuthService очікує 'username', а не 'name'
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = '';

  onSubmit() {
    if (this.registerForm.valid) {
      // Приводимо значення форми до типу any або RegisterRequest
      const requestData = this.registerForm.value as any;

      this.authService.register(requestData).subscribe({
        next: () => {
          console.log('Реєстрація успішна!');
          this.router.navigate(['/items']);
        },
        error: (err) => {
          console.error('Помилка реєстрації:', err);
          this.errorMessage = 'Щось пішло не так. Можливо, цей email вже зайнятий.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}