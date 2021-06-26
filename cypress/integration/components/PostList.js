describe("Make sure PostList loads", () => {
    it('loads without crashing', () => {
        cy.visit('/');
        cy.get('[data-testid=postList]').should('exist');
    })
})