describe("Find Transactions", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/index.htm");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("form").contains("Log In").click();
    cy.get("div[id=leftPanel]").contains("Find Transactions").click();
  });

  it("should find a transaction by ID", () => {
    //must input an active transaction id in order for test to work
    cy.get("input[id=criteria\\.transactionId]").type("21025");
    //looking for first find transaction button
    cy.get("button").eq(0).contains("Find Transactions").click();

    //checking that date is shown and "fund transfer sent" is active link
    cy.get("h1[class=title]").should("contain", "Transaction Results");
    cy.get("td[class=ng-binding]").should("not.have.value", "null");
    cy.get("a[class=ng-binding").should("not.have.attr", "href", "undefined");

    cy.url().should("include", "/findtrans.htm");
  });

  it("should find a transaction by date", () => {
    //must input a date associated with an active transaction id in order for transactions to show
    cy.get("input[id=criteria\\.onDate]").type("05-25-2021");
    //looking for second find transaction button
    cy.get("button").eq(1).contains("Find Transactions").click();

    //checking that date is shown and "fund transfer sent" is active link
    cy.get("h1[class=title]").should("contain", "Transaction Results");
    cy.get("td[class=ng-binding]").should("not.have.value", "null");
    cy.get("a[class=ng-binding").should("not.have.attr", "href", "undefined");

    cy.url().should("include", "/findtrans.htm");
  });
});
