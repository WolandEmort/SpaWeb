import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { IProduct } from '@core/models/product.interface';

describe('DataService', () => {
    let service: DataService;
    let httpMock: HttpTestingController;

    const mockProducts: IProduct[] = [
        { id: 1, name: 'Cream', price: 100, brand: 'A', description: 'desc', imageUrl: 'img', category: 'cat', volume: '50ml', inStock: true },
        { id: 2, name: 'Soap', price: 50, brand: 'B', description: 'desc', imageUrl: 'img', category: 'cat', volume: '100ml', inStock: false }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService]
        });
        service = TestBed.inject(DataService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Перевіряємо, що немає незавершених запитів
    });

    it('should retrieve all items via GET', () => {
        // 1. Виклик методу
        service.getAll().subscribe((items) => {
            expect(items.length).toBe(2);
            expect(items).toEqual(mockProducts);
        });

        // 2. Перехоплення запиту
        const req = httpMock.expectOne('items'); // Перевіряємо URL (endpoint)
        expect(req.request.method).toBe('GET');

        // 3. Відповідь заглушкою
        req.flush(mockProducts);
    });
});