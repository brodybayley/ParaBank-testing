describe("login", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");
  const firstName = Cypress.env("firstName");
  const lastName = Cypress.env("lastName");

  beforeEach(function () {
    cy.visit("/index.htm");
  });

  it("should display errors on login", () => {
    cy.get("input[name=username]").type("wrong username");
    cy.get("input[name=password]").type("wrong password");
    cy.get("form").contains("Log In").click();

    cy.get("p.error")
      .should("be.visible")
      .and("contain", "The username and password could not be verified.");

    cy.url().should("include", "/login.htm");
  });

  it("should redirect to /overview.htm on successful login", () => {
    //username and password pulled from cypress.env.json
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("form").contains("Log In").click();

    //should be redirected to overview page with welcome message on left panel
    cy.url().should("include", "/overview.htm");
    cy.get(".smallText").should("contain", `Welcome ${firstName} ${lastName}`);
  });
});
