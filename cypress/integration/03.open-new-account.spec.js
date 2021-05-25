describe("Open new account", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(function () {
    cy.visit("/index.htm");
    //username and password pulled from cypress.env.json
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("form").contains("Log In").click();
  });

  it("client is able to open a checkings account", () => {
    cy.get("ul").contains("Open New Account").click();
    cy.get("#type").select("0");
    cy.get("form").contains("Open New Account").click();

    cy.get("h1").should("contain", "Account Opened!");
  });
});
