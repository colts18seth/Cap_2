describe("Make sure Blog loads", () => {
    it('loads without crashing', () => {
        cy.visit('/blog/1');
        cy.get('[data-testid=Blog]').should('exist');
    })

    it('contains correct text', () => {
        cy.visit('/blog/1');
        cy.get('[data-testid=Blog]').should('contain', 'by:');
    })
})