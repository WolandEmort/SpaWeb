import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card';
import { RouterTestingModule } from '@angular/router/testing'; // Для routerLink
import { By } from '@angular/platform-browser';
import { IProduct } from '@core/models/product.interface';
import { Directive, Input } from '@angular/core';

// Мокаємо директиву Highlight, щоб не тягнути її логіку в цей тест
@Directive({
    selector: '[appHighlight]',
    standalone: true
})
class MockHighlightDirective {}

describe('ItemCardComponent', () => {
    let component: ItemCardComponent;
    let fixture: ComponentFixture<ItemCardComponent>;

    const mockItem: IProduct = {
        id: 1,
        name: 'Super Cream',
        brand: 'BrandX',
        price: 500,
        description: 'A very long description that might be truncated by the pipe',
        imageUrl: 'http://test.com/img.jpg',
        category: 'Face',
        volume: '50ml',
        inStock: true,
        isBestseller: true
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ItemCardComponent,
                RouterTestingModule,
                MockHighlightDirective // Підміняємо директиву
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ItemCardComponent);
        component = fixture.componentInstance;

        // Передаємо обов'язковий Input
        component.item = mockItem;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct product name', () => {
        const nameEl = fixture.debugElement.query(By.css('.product-name')).nativeElement;
        expect(nameEl.textContent).toContain('Super Cream');
    });

    it('should display bestseller badge if item is bestseller', () => {
        const badge = fixture.debugElement.query(By.css('.bestseller-badge'));
        expect(badge).toBeTruthy();
    });

    it('should have enabled buy button when inStock is true', () => {
        const btn = fixture.debugElement.query(By.css('.buy-button')).nativeElement;
        expect(btn.disabled).toBeFalse();
    });

    it('should disable button when out of stock', () => {
        component.item = { ...mockItem, inStock: false };
        fixture.detectChanges();

        const btn = fixture.debugElement.query(By.css('.buy-button')).nativeElement;
        expect(btn.disabled).toBeTrue();
        expect(btn.classList).toContain('out-of-stock');
    });
});