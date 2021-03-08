describe("Make sure Header loads", () => {
    it('loads without crashing', () => {
        cy.visit('/');
        cy.get('[data-testid=Header]').should('exist');
    })

    it('contains correct text', () => {
        cy.visit('/');
        cy.get('[data-testid=Header]').should('contain', 'Key_Blogger');
    })
})