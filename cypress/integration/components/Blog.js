describe("Make sure Blog loads", () => {
    it('loads without crashing', () => {
        cy.visit('/blog/1');
        cy.get('[data-testid=Blog]').should('exist');
    })

    it('contains correct text', () => {
        cy.visit('/blog/1');
        cy.get('[data-testid=Blog]').should('contain', 'by:');
    })

    it('opens when blog title is clicked', () => {
        cy.visit('/');
        cy.get('[data-testid=allBlogsLink]').click();
        cy.get(':nth-child(2) > .container > .text-decoration-none > [data-testid=blogTitle]').click();
        cy.get('[data-testid=Blog]').should('exist');
    })
})