import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProduct } from '@core/models/product.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  // ПУНКТ 3: Інжектуємо HttpClient
  private http = inject(HttpClient);

  // Частина URL (базову частину додасть Interceptor)
  private endpoint = 'items';

  // ПУНКТ 4: GET запит (отримати всі)
  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.endpoint).pipe(
        catchError(this.handleError) // ПУНКТ 6
    );
  }

  // ПУНКТ 4: GET запит (пошук по ID)
  getItemById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.endpoint}/${id}`).pipe(
        catchError(this.handleError)
    );
  }

  // ПУНКТ 4: POST запит (додавання)
  addItem(item: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.endpoint, item).pipe(
        catchError(this.handleError)
    );
  }

  // Пошук (серверна фільтрація ?q=...)
  search(searchTerm: string): Observable<IProduct[]> {
    const options = searchTerm ?
        { params: new HttpParams().set('q', searchTerm) } : {};

    return this.http.get<IProduct[]>(this.endpoint, options).pipe(
        catchError(this.handleError)
    );
  }

  // ПУНКТ 6: Обробка помилок
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Сталася невідома помилка!';
    if (error.error instanceof ErrorEvent) {
      // Помилка клієнта
      errorMessage = `Помилка з'єднання: ${error.error.message}`;
    } else {
      // Помилка сервера
      errorMessage = `Сервер повернув код ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}