describe("accounts overview", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  it("should show an error message if not logged in", () => {
    //user must not be logged in for correct results
    cy.visit("/overview.htm", { failOnStatusCode: false });

    //error message should show. Would recommend changing error message to inform client that they need to log in to access this page
    cy.get("#rightPanel")
      .contains("An internal error has occurred and has been logged.")
      .should("be.visible");
  });

  it("should access accounts overview page as a logged in client", () => {
    //client must log in first
    cy.visit("/index.htm");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password, { log: false });
    cy.get("form").contains("Log In").click();

    //Account number should be hyperlinked and balance/available amount should show
    cy.get("h1[class=title]").should("contain", "Accounts Overview");
    cy.get("a[class=ng-binding").should("not.have.attr", "href", "undefined");
    cy.get("td[class=ng-binding]").eq(0).should("not.have.value", "null");
    cy.get("td[class=ng-binding]").eq(1).should("not.have.value", "null");

    cy.url().should("include", "/overview.htm");
  });
});
