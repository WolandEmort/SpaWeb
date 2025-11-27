import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlight]', // Назва атрибута, який ми будемо використовувати в HTML
    standalone: true
})
export class HighlightDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) {
        // Встановлюємо плавну анімацію при ініціалізації
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
    }

    // Коли мишка наводиться на елемент
    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(true);
    }

    // Коли мишка покидає елемент
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(false);
    }

    private highlight(isActive: boolean) {
        if (isActive) {
            // Піднімаємо і додаємо тінь
            this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-10px)');
            this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 20px 40px rgba(0,0,0,0.15)');
            this.renderer.setStyle(this.el.nativeElement, 'border-color', '#a29bfe'); // Підсвітка рамки
        } else {
            // Повертаємо як було
            this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
            this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 10px 30px rgba(0,0,0,0.03)');
            this.renderer.removeStyle(this.el.nativeElement, 'border-color');
        }
    }
}