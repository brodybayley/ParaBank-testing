describe("New user registration", () => {
  beforeEach(function () {
    cy.visit("/register.htm");
  });

  it("displays errors when incomplete registration", () => {
    //Intentionally left out the SSN field so that the validation would fail
    cy.get("input[name=customer\\.firstName]").type("Para");
    cy.get("input[name=customer\\.lastName]").type("Bank");
    cy.get("input[name=customer\\.address\\.street]").type(
      "101 E. Huntington Drive"
    );
    cy.get("input[name=customer\\.address\\.city]").type("Monrovia");
    cy.get("input[name=customer\\.address\\.state]").type("CA");
    cy.get("input[name=customer\\.address\\.zipCode]").type("91016");
    cy.get("input[name=customer\\.phoneNumber]").type("1-888-305-0041");
    cy.get("input[name=customer\\.username]").type("Invalid Account");
    cy.get("input[name=customer\\.password]").type("Fake Passw0rd");
    cy.get("input[name=repeatedPassword]").type("Fake Passw0rd");
    cy.get("form").contains("Register").click();

    //SSN error message will show as this is the only empty field
    cy.get("span.error")
      .should("be.visible")
      .and("contain", "Social Security Number is required.");

    cy.url().should("include", "/register.htm");
  });

  it("redirects to /register.htm on successful registration", () => {
    //created variables for below fields to easily be updated
    const firstName = "Para";
    const lastName = "Bank";
    const username = "Valid Account3";

    cy.get("input[name=customer\\.firstName]").type(firstName);
    cy.get("input[name=customer\\.lastName]").type(lastName);
    cy.get("input[name=customer\\.address\\.street]").type(
      "101 E. Huntington Drive"
    );
    cy.get("input[name=customer\\.address\\.city]").type("Monrovia");
    cy.get("input[name=customer\\.address\\.state]").type("CA");
    cy.get("input[name=customer\\.address\\.zipCode]").type("91016");
    cy.get("input[name=customer\\.phoneNumber]").type("1-888-305-0041");
    cy.get("input[name=customer\\.ssn]").type("123456789");
    cy.get("input[name=customer\\.username]").type(username);
    cy.get("input[name=customer\\.password]").type("Fake Passw0rd");
    cy.get("input[name=repeatedPassword]").type("Fake Passw0rd");
    cy.get("form").contains("Register").click();

    //should be redirected to registration page with user profile and custom welcome messages
    cy.url().should("include", "/register.htm");
    cy.get(".smallText").should("contain", `Welcome ${firstName} ${lastName}`);
    cy.get("h1").should("contain", `Welcome ${username}`);
  });
});
