describe("Make sure Login loads", () => {
    it('loads without crashing', () => {
        cy.visit('/login');
        cy.get('[data-testid=loginForm]').should('exist');
    })

    it('logs in user when username and password are correct', () => {
        cy.visit('/login');
        cy.get('#username').type("test");
        cy.get('#password').type("password");
        cy.get('.justify-content-center').click();
        cy.get('[data-testid=postList]').should('exist');
    })

    it("doesn't log in user when username and password are incorrect", () => {
        cy.visit('/login');
        cy.get('#username').type("test");
        cy.get('#password').type("wrong");
        cy.get('.justify-content-center').click();
        cy.get('.error').should('exist');
    })
})