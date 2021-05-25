describe("Bill Pay", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/index.htm");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("form").contains("Log In").click();
  });

  it("should display warning messages when payee information fields left blank", () => {
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

  it("should display error message if account or amount starts with a letter instead of a number", () => {
    //seems like the error should appear if there is a letter inputted at any point in the account or amount field, but error only appears if the first element is a number.
    cy.get("div[id=leftPanel]").contains("Bill Pay").click();

    cy.get("input[name=payee\\.name]").type("New Payee");
    cy.get("input[name=payee\\.address\\.street]").type("1234 Happy Lane");
    cy.get("input[name=payee\\.address\\.city]").type("Portland");
    cy.get("input[name=payee\\.address\\.state]").type("OR");
    cy.get("input[name=payee\\.address\\.zipCode]").type("92103");
    cy.get("input[name=payee\\.phoneNumber]").type("1-888-486-4567");
    cy.get("input[name=payee\\.accountNumber]").type("d23456789");
    cy.get("input[name=verifyAccount]").type("d23456789");
    cy.get("input[name=amount]").type("a1000.00");
    cy.get("form").submit();

    cy.get("span.error")
      .should("be.visible")
      .and("contain", "Please enter a valid number.")
      .and("contain", "Please enter a valid amount.");

    cy.url().should("include", "/billpay.htm");
  });

  it("should display error message if account or amount has a letter inputted after first element", () => {
    //This may be a glitch, but wanted to add a test case to show what happens when account or amount starts with a number, but then a letter is added in.
    cy.get("div[id=leftPanel]").contains("Bill Pay").click();

    cy.get("input[name=payee\\.name]").type("New Payee");
    cy.get("input[name=payee\\.address\\.street]").type("1234 Happy Lane");
    cy.get("input[name=payee\\.address\\.city]").type("Portland");
    cy.get("input[name=payee\\.address\\.state]").type("OR");
    cy.get("input[name=payee\\.address\\.zipCode]").type("92103");
    cy.get("input[name=payee\\.phoneNumber]").type("1-888-486-4567");
    cy.get("input[name=payee\\.accountNumber]").type("1dddd6789");
    cy.get("input[name=verifyAccount]").type("1dddd6789");
    cy.get("input[name=amount]").type("1dd0.00");
    cy.get("form").submit();
    cy.wait(500);

    cy.get("p[class=error]").should(
      "contain",
      "An internal error has occurred and has been logged."
    );

    cy.url().should("include", "/billpay.htm");
  });

  it("should display error message if account number doesn't match verification", () => {
    //Intentionally made account and verify account different to display error
    cy.get("div[id=leftPanel]").contains("Bill Pay").click();

    cy.get("input[name=payee\\.name]").type("New Payee");
    cy.get("input[name=payee\\.address\\.street]").type("1234 Happy Lane");
    cy.get("input[name=payee\\.address\\.city]").type("Portland");
    cy.get("input[name=payee\\.address\\.state]").type("OR");
    cy.get("input[name=payee\\.address\\.zipCode]").type("92103");
    cy.get("input[name=payee\\.phoneNumber]").type("1-888-486-4567");
    cy.get("input[name=payee\\.accountNumber]").type("123456789");
    cy.get("input[name=verifyAccount]").type("353456");
    cy.get("input[name=amount]").type("1000.00");
    cy.get("form").submit();

    cy.get("span.error")
      .should("be.visible")
      .and("contain", "The account numbers do not match.");

    cy.url().should("include", "/billpay.htm");
  });

  it("should send payment when payee information entered correctly", () => {
    cy.get("div[id=leftPanel]").contains("Bill Pay").click();

    cy.get("input[name=payee\\.name]").type("New Payee");
    cy.get("input[name=payee\\.address\\.street]").type("1234 Happy Lane");
    cy.get("input[name=payee\\.address\\.city]").type("Portland");
    cy.get("input[name=payee\\.address\\.state]").type("OR");
    cy.get("input[name=payee\\.address\\.zipCode]").type("92103");
    cy.get("input[name=payee\\.phoneNumber]").type("1-888-486-4567");
    cy.get("input[name=payee\\.accountNumber]").type("123456789");
    cy.get("input[name=verifyAccount]").type("123456789");
    cy.get("input[name=amount]").type("1000.00");
    cy.get("form").submit();

    cy.get("h1[class=title]").should("contain", "Bill Payment Complete");
    cy.get("span[id=payeeName]").should("not.have.value", "null");
    cy.get("span[id=amount]").should("not.have.value", "null");
    cy.get("span[id=fromAccountId]").should("not.have.value", "null");

    cy.url().should("include", "/billpay.htm");
  });
});
