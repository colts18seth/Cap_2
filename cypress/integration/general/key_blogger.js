describe("Make sure app loads", () => {
    it('loads without crashing', () => {
        cy.visit('/');
    })
})

describe("Check that user must authenticate to make new blog.", () => {
    it('redirects to login when "start a new blog" button is clicked without a current user', () => {
        cy.visit('/');

        cy.get('[data-testid=startNewBlogLink]').click();
        cy.get('[data-testid=loginForm]').should('exist');
    })

    it('opens newBlogForm after clicking "start new blog", when logged in', () => {
        cy.visit('/');
        cy.get('[data-testid=loginLogoutLink]').click();
        cy.get('#username').type("test");
        cy.get('#password').type("password");
        cy.get('.justify-content-center').click();
        cy.get('[data-testid=startNewBlogLink]').click().click();
        cy.get('[data-testid=newBlogForm]').should('exist');
    })
})

describe("Make sure correct content loads at correct time", () => {
    it('loads recent posts on first load', () => {
        cy.visit('/');
        cy.get('[data-testid=postList]').should('exist');
    })

    it("loads all blogs on 'all blogs' click", () => {
        cy.visit('/');
        cy.get('[data-testid=allBlogsLink]').click();
        cy.get('[data-testid=BlogList]').should('exist');
        cy.url().should('include', '/blogs');
    })
})