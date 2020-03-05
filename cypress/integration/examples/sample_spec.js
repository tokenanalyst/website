describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('http://localhost:3000/');
    // cy.visit('https://example.cypress.io');
    cy.contains('View Dashboard').click();
    cy.url().should('include', '/dashboard');
  });
});
