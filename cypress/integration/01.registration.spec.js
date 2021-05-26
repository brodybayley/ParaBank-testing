describe("registration", () => {
  beforeEach(function () {
    cy.visit("/register.htm");
  });

  it("should display errors when incomplete registration", () => {
    //Intentionally left all fields out so errors would show
    cy.get("form").contains("Register").click();

    cy.get("span.error")
      .should("be.visible")
      .and("contain", "Social Security Number is required.");

    cy.url().should("include", "/register.htm");
  });

  it("should display error when username already exists", () => {
    //Using active client as client must already be registered for error to show
    const username = Cypress.env("username");

    cy.get("input[name=customer\\.firstName]").type("Para");
    cy.get("input[name=customer\\.lastName]").type("Bank");
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

    cy.get("span.error")
      .should("be.visible")
      .and("contain", "This username already exists.");

    cy.url().should("include", "/register.htm");
  });

  it("should redirect to /register.htm on successful registration", () => {
    //Generates random client ID's for usernames
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const username = id;

    cy.get("input[name=customer\\.firstName]").type("Para");
    cy.get("input[name=customer\\.lastName]").type("Bank");
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
    cy.get(".smallText").should("contain", "Welcome Para Bank");
    cy.get("h1").should("contain", `Welcome ${username}`);
  });
});
