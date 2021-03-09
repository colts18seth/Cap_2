describe("Make sure SearchBar loads", () => {
    it('loads without crashing', () => {
        cy.visit('/');
        cy.get('[data-testid=searchBar]').should('exist');
        cy.visit('/blogs');
        cy.get('[data-testid=searchBar]').should('exist');

    })
})