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

  it("should show an error if amount entered is more than 15 numbers in length", () => {
    cy.get("#leftPanel").contains("Transfer Funds").click();

    //amount field intentionally left out to trigger error message. Delay required to allow page to fully load before submit or error won't show
    cy.url().should("include", "/transfer.htm");
    cy.wait(500);
    cy.get("#amount").type("1234567891234567");
    cy.get("form").submit();
    //Error message should show, but perhaps an error advising clients that number is too big would be more useful
    cy.get("p[class=error]").should(
      "contain",
      "An internal error has occurred and has been logged."
    );
  });

  it("should successfully complete a transfer when amount is entered", () => {
    cy.get("#leftPanel").contains("Transfer Funds").click();

    cy.url().should("include", "/transfer.htm");
    //timeout delay required in order to allow accounts to load or error message will appear. Added notes in ReadMe
    cy.wait(500);
    cy.get("#amount").type("3900");
    cy.get("form").submit();
    cy.get("span[id=amount]").should("not.have.value", "null");
    cy.get("span[id=fromAccountId]").should("not.have.value", "null");
    cy.get("span[id=toAccountId]").should("not.have.value", "null");
  });
});
