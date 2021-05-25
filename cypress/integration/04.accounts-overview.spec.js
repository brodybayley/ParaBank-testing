describe("Accounts Overview", () => {
  it("Should show an error message if not logged in", () => {
    //user must not be logged in for test to work correctly
    cy.visit("/overview.htm", { failOnStatusCode: false });

    //error message should show. Would recommend updating error message to inform client that they need to log in to access this page
    cy.get("#rightPanel")
      .contains("An internal error has occurred and has been logged.")
      .should("be.visible");
  });
});
