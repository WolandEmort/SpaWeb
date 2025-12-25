describe('Item Card Display Scenario', () => {
    beforeEach(() => {
        cy.visit('/items');
    });

    it('should display product card with correct elements', () => {
        cy.get('.product-card').should('exist');
        cy.get('.product-card').should('have.length.greaterThan', 0);

        cy.get('.product-card').first().within(() => {
            cy.get('.product-image').should('be.visible');
            cy.get('.product-name').should('not.be.empty');

            // 👇 ВИПРАВЛЕНО ТУТ:
            // Використовуємо 'invoke', щоб взяти текст, і 'match' з регулярним виразом
            // /UAH|₴/ означає: шукати "UAH" АБО "₴"
            cy.get('.product-price').invoke('text').should('match', /UAH|₴/);

            cy.get('.buy-button').should('exist');
        });
    });

    it('should navigate to details page on click', () => {
        cy.get('.details-button').first().click();
        cy.url().should('include', '/items/');
    });
});