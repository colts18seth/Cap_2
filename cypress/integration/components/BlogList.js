describe("Make sure BlogList loads", () => {
    it('loads without crashing', () => {
        cy.visit('/blogs');
        cy.get('[data-testid=BlogList]').should('exist');
    })

    it('opens when "all blogs" is clicked', () => {
        cy.visit('/');
        cy.get('[data-testid=allBlogsLink]').click();
        cy.get('[data-testid=BlogList]').should('exist');
    })
})