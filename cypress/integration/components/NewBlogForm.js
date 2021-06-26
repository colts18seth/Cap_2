describe("Make sure NewBlogForm loads", () => {
    it('loads without crashing', () => {
        cy.visit('/');
        cy.get('[data-testid=loginLogoutLink]').click();
        cy.get('#username').type("test");
        cy.get('#password').type("password");
        cy.get('.justify-content-center').click();
        cy.get('[data-testid=startNewBlogLink]').click().click();
        cy.get('[data-testid=newBlogForm]').should('exist');
    })

    it('can not access unless logged in', () => {
        cy.visit('/newBlog');
        cy.get('[data-testid=loginForm]').should('exist');
    })
})