describe("Transfer Funds", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/index.htm");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("form").contains("Log In").click();
  });

  it("should show an error if no amount is entered", () => {
    cy.get("#leftPanel").contains("Transfer Funds").click();

    //amount field intentionally left out to trigger error message. Delay required to allow page to fully load before submit or error won't show
    cy.url().should("include", "/transfer.htm");
    cy.wait(500);
    cy.get("form").submit();
    cy.get("#amount\\.errors").should("contain", "The amount cannot be empty.");
  });
});
