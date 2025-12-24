import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
}

export interface AuthResponse {
    accessToken: string;
    user: {
        id: number;
        email: string;
        username: string;
    };
}

export interface User {
    id: number;
    email: string;
    username: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadUserFromToken();
    }

    /**
     * Вхід користувача
     */
    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap(response => {
                    this.setSession(response);
                }),
                catchError(error => {
                    console.error('Login error:', error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Реєстрація нового користувача
     */
    register(userData: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
            .pipe(
                tap(response => {
                    this.setSession(response);
                }),
                catchError(error => {
                    console.error('Registration error:', error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Вихід користувача
     */
    logout(): void {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
        this.currentUserSubject.next(null);
    }

    /**
     * Отримання токену
     */
    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    /**
     * Збереження токену
     */
    private setToken(token: string): void {
        localStorage.setItem('auth_token', token);
    }

    /**
     * Перевірка чи користувач авторизований
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    /**
     * Отримання поточного користувача
     */
    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    /**
     * Збереження сесії після успішної авторизації
     */
    private setSession(authResult: AuthResponse): void {
        this.setToken(authResult.accessToken);
        localStorage.setItem('current_user', JSON.stringify(authResult.user));
        this.currentUserSubject.next(authResult.user);
    }

    /**
     * Завантаження даних користувача з токену при ініціалізації
     */
    private loadUserFromToken(): void {
        const token = this.getToken();
        if (token) {
            const userJson = localStorage.getItem('current_user');
            if (userJson) {
                try {
                    const user = JSON.parse(userJson);
                    this.currentUserSubject.next(user);
                } catch (e) {
                    console.error('Error parsing user data:', e);
                    this.logout();
                }
            }
        }
    }
}