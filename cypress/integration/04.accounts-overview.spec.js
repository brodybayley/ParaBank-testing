describe("accounts overview", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  it("should show an error message if not logged in", () => {
    //user must not be logged in for test to work correctly
    cy.visit("/overview.htm", { failOnStatusCode: false });

    //error message should show. Would recommend updating error message to inform client that they need to log in to access this page
    cy.get("#rightPanel")
      .contains("An internal error has occurred and has been logged.")
      .should("be.visible");
  });

  it("should access overviews page as a logged in client", () => {
    //client must log in first
    cy.visit("/index.htm");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("form").contains("Log In").click();

    //After logging in client should be redirected to overview page
    cy.url().should("include", "/overview.htm");
    //Account number should be hyperlinked and take client to /activity page
    cy.get("#accountTable")
      .find("a")
      .should("not.have.attr", "href", "undefined");
    cy.get("td").find(".ng-binding").should("not.have.value", "null");
  });
});
