describe("Bill Pay", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/index.htm");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("form").contains("Log In").click();
  });

  it("displays errors when payee information left blank", () => {
    //Intentionally didn't input any values into fields so error messages would show
    cy.get("div[id=leftPanel]").contains("Bill Pay").click();
    cy.get("form").submit();

    cy.get("span.error")
      .should("be.visible")
      .and("contain", "Payee name is required.")
      .and("contain", "Address is required.")
      .and("contain", "City is required.")
      .and("contain", "State is required.")
      .and("contain", "Zip Code is required.")
      .and("contain", "Phone number is required.")
      .and("contain", "Account number is required.")
      .and("contain", "The amount cannot be empty.");

    cy.url().should("include", "/billpay.htm");
  });
});
