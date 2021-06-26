describe("Make sure Nav loads", () => {
    it('loads without crashing', () => {
        cy.visit('/');
        cy.get('[data-testid=nav]').should('exist');
    })

    it("loads 'recent posts' correctly when clicked", () => {
        cy.visit('/login');
        cy.get('[data-testid=recentPostsLink] > .text-decoration-none').click()
        cy.get('[data-testid=postList]').should('exist');
    })

    it("loads 'all blogs' correctly when clicked", () => {
        cy.visit('/');
        cy.get('[data-testid=allBlogsLink] > .text-decoration-none').click()
        cy.get('[data-testid=BlogList]').should('exist');
    })

    it("loads 'start new blog' correctly when clicked", () => {
        cy.visit('/');
        cy.get('[data-testid=loginLogoutLink]').click();
        cy.get('#username').type("test");
        cy.get('#password').type("password");
        cy.get('.justify-content-center').click();
        cy.get('[data-testid=startNewBlogLink]').click().click();
        cy.get('[data-testid=newBlogForm]').should('exist');
    })

    it("loads 'login' correctly when clicked", () => {
        cy.visit('/');
        cy.get('[data-testid=loginLogoutLink]').click();
        cy.get('[data-testid=loginForm]').should('exist');
    })
})