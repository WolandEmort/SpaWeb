import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card';
import { IProduct } from '@core/models/product.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

// 1. 👇 Робимо тестовий хост Standalone і імпортуємо туди картку
@Component({
    standalone: true, // <--- ВАЖЛИВО
    imports: [ItemCardComponent, CommonModule], // <--- ВАЖЛИВО: Картка імпортується сюди
    template: `<app-item-card [item]="parentItem"></app-item-card>`
})
class TestHostComponent {
    parentItem: IProduct = {
        id: 99,
        name: 'Integration Item',
        brand: 'TestBrand',
        price: 100,
        description: 'Desc',
        imageUrl: 'img.jpg',
        category: 'Test',
        volume: '100ml',
        inStock: true
    };
}

describe('ItemCard Integration', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            // 2. 👇 Тепер нам треба імпортувати тільки сам HostComponent
            imports: [TestHostComponent, RouterTestingModule]
            // declarations нам більше не потрібен, бо HostComponent тепер standalone
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should correctly render data passed from parent component', () => {
        const productTitle = fixture.nativeElement.querySelector('.product-name');
        expect(productTitle.textContent).toContain('Integration Item');
    });

    it('should update child view when parent data changes', () => {
        hostComponent.parentItem = { ...hostComponent.parentItem, price: 999 };

        // Примусово запускаємо оновлення
        fixture.detectChanges();

        const priceEl = fixture.nativeElement.querySelector('.product-price');
        expect(priceEl.textContent).toContain('999');
    });
});