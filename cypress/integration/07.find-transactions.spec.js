describe("find transactions", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/index.htm");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password, { log: false });
    cy.get("form").contains("Log In").click();
    cy.get("div[id=leftPanel]").contains("Find Transactions").click();
  });

  it("should display error message below find by ID input field when left blank", () => {
    //comparing length of input before error message appears and after message appears.
    cy.get("input:invalid").should("have.length", 0);
    cy.get("button").eq(0).contains("Find Transactions").click();
    cy.get("input:invalid").should("have.length", 1);
    //comparing input[0] to expected string and should equal the same
    cy.get("input[id=criteria\\.transactionId]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });

    cy.url().should("include", "/findtrans.htm");
  });

  it("should display error message below find by date input field when left blank", () => {
    //comparing length of input before error message appears and after message appears.
    cy.get("input:invalid").should("have.length", 0);
    cy.get("button").eq(1).contains("Find Transactions").click();
    cy.get("input:invalid").should("have.length", 1);
    //comparing input[0] to expected string and should equal the same
    cy.get("input[id=criteria\\.transactionId]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });

    cy.url().should("include", "/findtrans.htm");
  });

  it("should display error message below find by date range input field when left blank", () => {
    //comparing length of input before error message appears and after message appears.
    cy.get("input:invalid").should("have.length", 0);
    cy.get("button").eq(2).contains("Find Transactions").click();
    cy.get("input:invalid").should("have.length", 1);
    //comparing input[0] to expected string and should equal the same
    cy.get("input[id=criteria\\.transactionId]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });

    cy.url().should("include", "/findtrans.htm");
  });

  it("should display error message below find by value input field when left blank", () => {
    //comparing length of input before error message appears and after message appears.
    cy.get("input:invalid").should("have.length", 0);
    cy.get("button").eq(3).contains("Find Transactions").click();
    cy.get("input:invalid").should("have.length", 1);
    //comparing input[0] to expected string and should equal the same
    cy.get("input[id=criteria\\.transactionId]").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });

    cy.url().should("include", "/findtrans.htm");
  });

  it("should show an error message when non numbers are inputted into find by ID", () => {
    cy.get("input[id=criteria\\.transactionId]").type("2V02F");
    cy.get("button").eq(0).contains("Find Transactions").click();

    cy.get("p[class=error]").should(
      "contain",
      "An internal error has occurred and has been logged."
    );

    cy.url().should("include", "/findtrans.htm");
  });

  it("should show an error message if non numbers are inputted into find by date", () => {
    cy.get("input[id=criteria\\.onDate]").type("KK-25-2021");
    cy.get("button").eq(1).contains("Find Transactions").click();

    cy.get("p[class=error]").should(
      "contain",
      "An internal error has occurred and has been logged."
    );

    cy.url().should("include", "/findtrans.htm");
  });

  it("should show an error message if non numbers are inputted into find by date range", () => {
    cy.get("input[id=criteria\\.fromDate]").type("$f-15-2021");
    cy.get("input[id=criteria\\.toDate]").type("05-TT-2021");
    cy.get("button").eq(2).contains("Find Transactions").click();

    cy.get("p[class=error]").should(
      "contain",
      "An internal error has occurred and has been logged."
    );

    cy.url().should("include", "/findtrans.htm");
  });

  it("should show an error message if non numbers are inputted into find by amount", () => {
    cy.get("input[id=criteria\\.amount]").type("A!0.00");
    cy.get("button").eq(3).contains("Find Transactions").click();

    cy.get("p[class=error]").should(
      "contain",
      "An internal error has occurred and has been logged."
    );

    cy.url().should("include", "/findtrans.htm");
  });

  it("should show no results if date has no transactions", () => {
    cy.get("input[id=criteria\\.onDate]").type("05-25-2019");
    cy.get("button").eq(1).contains("Find Transactions").click();

    cy.get("h1[class=title]").should("contain", "Transaction Results");
    cy.get("td[class=ng-binding]").should("not.exist");
    cy.get("a[class=ng-binding").should("not.exist");

    cy.url().should("include", "/findtrans.htm");
  });

  it("should show no results if date range has no transactions", () => {
    cy.get("input[id=criteria\\.fromDate]").type("05-15-2019");
    cy.get("input[id=criteria\\.toDate]").type("05-25-2019");
    cy.get("button").eq(2).contains("Find Transactions").click();

    cy.get("h1[class=title]").should("contain", "Transaction Results");
    cy.get("td[class=ng-binding]").should("not.exist");
    cy.get("a[class=ng-binding").should("not.exist");

    cy.url().should("include", "/findtrans.htm");
  });

  it("should show an error message if no transaction amount matches inputted amount", () => {
    cy.get("input[id=criteria\\.amount]").type("299.00");
    cy.get("button").eq(3).contains("Find Transactions").click();

    cy.get("h1[class=title]").should("contain", "Transaction Results");
    cy.get("td[class=ng-binding]").should("not.exist");
    cy.get("a[class=ng-binding").should("not.exist");

    cy.url().should("include", "/findtrans.htm");
  });

  it("should show an error message when transaction ID doesn't exist", () => {
    //must input invalid transaction ID
    cy.get("input[id=criteria\\.transactionId]").type("22025");
    cy.get("button").eq(0).contains("Find Transactions").click();

    //error message appears, but perhaps a more useful message could show to tell user no transactions found
    cy.get("p[class=error]").should(
      "contain",
      "An internal error has occurred and has been logged."
    );

    cy.url().should("include", "/findtrans.htm");
  });

  it("should find a transaction by transaction ID", () => {
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
    //must input a date associated with an active transaction id in order for results to show
    cy.get("input[id=criteria\\.onDate]").type("05-25-2021");
    cy.get("button").eq(1).contains("Find Transactions").click();

    cy.get("h1[class=title]").should("contain", "Transaction Results");
    cy.get("td[class=ng-binding]").should("not.have.value", "null");
    cy.get("a[class=ng-binding").should("not.have.attr", "href", "undefined");

    cy.url().should("include", "/findtrans.htm");
  });

  it("should find a transaction by date range", () => {
    //must input a date range ssociated with an active transaction id in order for results to show
    cy.get("input[id=criteria\\.fromDate]").type("05-15-2021");
    cy.get("input[id=criteria\\.toDate]").type("05-25-2021");
    cy.get("button").eq(2).contains("Find Transactions").click();

    cy.get("h1[class=title]").should("contain", "Transaction Results");
    cy.get("td[class=ng-binding]").should("not.have.value", "null");
    cy.get("a[class=ng-binding").should("not.have.attr", "href", "undefined");

    cy.url().should("include", "/findtrans.htm");
  });

  it("should find a transaction by amount", () => {
    //must input an amount that is associated with an active transaction id in order for results to show
    cy.get("input[id=criteria\\.amount]").type("100.00");
    cy.get("button").eq(3).contains("Find Transactions").click();

    cy.get("h1[class=title]").should("contain", "Transaction Results");
    cy.get("td[class=ng-binding]").should("not.have.value", "null");
    cy.get("a[class=ng-binding").should("not.have.attr", "href", "undefined");

    cy.url().should("include", "/findtrans.htm");
  });
});
