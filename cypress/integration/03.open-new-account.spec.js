describe("open new account", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(function () {
    cy.visit("/index.htm");
    //username and password pulled from cypress.env.json
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password, { log: false });
    cy.get("form").contains("Log In").click();
  });

  it("should open a checkings account", () => {
    cy.get("ul").contains("Open New Account").click();
    cy.get("#type").select("0");
    cy.get("#type").should("have.value", "0");
    cy.get("form").contains("Open New Account").click();

    //Success screen should show and if you click on new account hyperlink you should be taken to account details page
    cy.get("h1").should("contain", "Account Opened!");
    cy.get("b").should("contain", "Your new account number:");
    cy.get("#newAccountId")
      .should("have.attr", "href")
      .and("include", "activity")
      .then((href) => {
        cy.visit(href);
      });
  });

  it("should open a savings account", () => {
    cy.get("ul").contains("Open New Account").click();
    cy.get("#type").select("1");
    cy.get("#type").should("have.value", "1");
    cy.get("form").contains("Open New Account").click();

    //Success screen should show and if you click on new account hyperlink you should be taken to account details page
    cy.get("h1").should("contain", "Account Opened!");
    cy.get("b").should("contain", "Your new account number:");
    cy.get("#newAccountId")
      .should("have.attr", "href")
      .and("include", "activity")
      .then((href) => {
        cy.visit(href);
      });
  });
});
