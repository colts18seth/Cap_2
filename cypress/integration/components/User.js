describe("Make sure user loads", () => {
    it('loads without crashing', () => {
        cy.visit('/');
        cy.get(':nth-child(2) > .container > .justify-content-between > :nth-child(2) > a').click();
        cy.get('[data-testid=userProfile]').should('exist');
    })
})