import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard для захисту маршрутів від неавторизованих користувачів
 * Використовується для сторінок, які потребують авторизації (додавання/редагування)
 */
export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        // Користувач авторизований - дозволяємо доступ
        return true;
    }

    // Користувач не авторизований - перенаправляємо на сторінку логіну
    // Зберігаємо URL для повернення після успішного входу
    router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
    });

    return false;
};