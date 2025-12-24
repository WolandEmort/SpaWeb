import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {

  // Використовуємо inject для підключення сервісів
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Створюємо форму з валідацією
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Змінна для відображення помилок з сервера
  errorMessage = '';

  onSubmit() {
    if (this.registerForm.valid) {
      // Відправляємо дані на сервер
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          // Якщо успішно — переходимо в каталог
          console.log('Реєстрація успішна!');
          this.router.navigate(['/items']);
        },
        error: (err) => {
          // Якщо помилка (наприклад, такий email вже є)
          console.error('Помилка реєстрації:', err);
          this.errorMessage = 'Щось пішло не так. Можливо, цей email вже зайнятий.';
        }
      });
    } else {
      // Якщо форма невалідна — підсвічуємо червоним всі поля
      this.registerForm.markAllAsTouched();
    }
  }
}