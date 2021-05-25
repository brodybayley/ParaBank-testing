describe("Logging In", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");
  const firstName = Cypress.env("firstName");
  const lastName = Cypress.env("lastName");

  beforeEach(function () {
    cy.visit("/index.htm");
  });

  context("cy.request", () => {
    it("displays errors on login", () => {
      cy.get("input[name=username]").type("wrong username");
      cy.get("input[name=password]").type("wrong password");
      cy.get("form").submit();

      cy.get("p.error")
        .should("be.visible")
        .and("contain", "The username and password could not be verified.");

      cy.url().should("include", "/login.htm");
    });

    it("redirects to /overview.htm on successful login", () => {
      //username and password pulled from cypress.env.json
      cy.get("input[name=username]").type(username);
      cy.get("input[name=password]").type(password);
      cy.get("form").submit();

      //should be redirected to overview page with welcome message on left panel
      cy.url().should("include", "/overview.htm");
      cy.get("p").should("contain", `Welcome ${firstName} ${lastName}`);
    });
  });
});
