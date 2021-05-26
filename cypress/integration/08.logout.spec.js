describe("logout", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/index.htm");
    cy.get("input[name=username]").type(username, { log: false });
    cy.get("input[name=password]").type(password);
    cy.get("form").contains("Log In").click();
  });

  it("should log client out", () => {
    cy.get("div[id=leftPanel]").contains("Log Out").click();

    cy.get("h2").should("contain", "Customer Login");
    cy.get("#loginPanel").should("be.visible");

    cy.url().should("include", "/index.htm");
  });
});
