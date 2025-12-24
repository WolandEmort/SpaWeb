import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000';
    private http = inject(HttpClient);
    private router = inject(Router);

    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.accessToken) {
                    localStorage.setItem('auth_token', response.accessToken);
                }
            })
        );
    }

    register(userData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
            tap(response => {
                if (response.accessToken) {
                    localStorage.setItem('auth_token', response.accessToken);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}