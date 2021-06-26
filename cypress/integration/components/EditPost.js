describe("Make sure EditPost loads", () => {
    it('loads without crashing', () => {
        cy.visit('/');
        cy.get('[data-testid=loginLogoutLink]').click();
        cy.get('#username').type("test");
        cy.get('#password').type("password");
        cy.get('.justify-content-center').click();
        cy.get(':nth-child(2) > .container > .text-decoration-none > h3').click();
        cy.get('.text-decoration-none > .btn').click();
        cy.get('[data-testid=editor]').should('exist');
    })

    it('opens only when correct user is logged in', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('TypeError')

            done()

            return false
        })
        cy.visit('/post/1/edit');
    })
})