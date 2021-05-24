describe("Logging In", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

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

      cy.url().should("include", "/");
    });
  });
});
