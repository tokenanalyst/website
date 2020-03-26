describe('Pricing page', () => {
  // it('should load pricing page', () => {
  //   cy.visit('/');
  //   cy.contains('Pricing').click();
  //   cy.url().should('include', '/pricing');
  // });

  it('should click view plan button', () => {
    cy.visit('/pricing');
    cy.get('.product-selection-card')
      .find('button')
      .each($el => {
        cy.wrap($el).click();
        cy.scrollTo(0, 0);
      });
  });
  it('should redirect to stripe', () => {
    cy.visit('/pricing');
    cy.contains('Buy Plan').click();
    // cy.url().should('include', 'https://checkout.stripe.com/');
  });
});
