describe("Make sure Post loads", () => {
    it('loads without crashing', () => {
        cy.visit('/');
        cy.get(':nth-child(2) > .container > .text-decoration-none > h3').click();
        cy.get('[data-testid=post]').should('exist');
    })
})