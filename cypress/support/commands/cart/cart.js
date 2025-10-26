

Cypress.Commands.add('assertContinueShoppingRedirectBack', () => {
    cy.goToCart()
    cy.get('[data-test="continue-shopping"]').should('be.visible').click();
    cy.url().should('include', '/inventory.html')
});

Cypress.Commands.add('cartPageRemoveItem', (product) => {
    cy.contains('.cart_item', product)
        .find('button')
        .contains('Remove')
        .click();
});
Cypress.Commands.add('assertValidationFirstName', (information) => {
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.url().should('include', '/checkout-step-one.html')
    // fill up user information except firstname
    // cy.get('[data-test="firstName"]').should('be.visible').type(information.firstName)

    cy.get('[data-test="lastName"]').should('be.visible').type(information.lastName)
    cy.get('[data-test="postalCode"]').should('be.visible').type(information.zipCode)
    cy.get('[data-test="continue"]').should('be.visible').click();
    cy.get('[data-test="firstName"]').should('have.class', 'error')

});
Cypress.Commands.add('assertValidationLastName', (information) => {
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.url().should('include', '/checkout-step-one.html')
    // fill up user information except firstname
    cy.get('[data-test="firstName"]').should('be.visible').type(information.firstName)
    cy.get('[data-test="postalCode"]').should('be.visible').type(information.zipCode)
    cy.get('[data-test="continue"]').should('be.visible').click();
    cy.get('[data-test="lastName"]').should('have.class', 'error')

});

Cypress.Commands.add('assertValidationZipCode', (information) => {
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.url().should('include', '/checkout-step-one.html')
    // fill up user information except firstname
    cy.get('[data-test="firstName"]').should('be.visible').type(information.firstName)
    cy.get('[data-test="lastName"]').should('be.visible').type(information.lastName)
    cy.get('[data-test="continue"]').should('be.visible').click();
    cy.get('[data-test="postalCode"]').should('have.class', 'error')

});
Cypress.Commands.add('assertValidationAll', () => {
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.url().should('include', '/checkout-step-one.html')

    cy.get('[data-test="continue"]').should('be.visible').click();

    cy.get('[data-test="firstName"]').should('have.class', 'error')
    cy.get('[data-test="lastName"]').should('have.class', 'error')
    cy.get('[data-test="postalCode"]').should('have.class', 'error')

});
Cypress.Commands.add('assertRemoveItemFromCart', (product) => {
    cy.addToCart(product)
    cy.goToCart()
    cy.url().should('include', '/cart.html')
    cy.get('body').should('contain.text', product).should('be.visible')
    cy.cartPageRemoveItem('Sauce Labs Backpack')
    cy.contains('.cart_item', product).should('not.exist')
});
Cypress.Commands.add('assertCheckout', (information) => {
    //redirect to checkout
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.url().should('include', '/checkout-step-one.html')
    // fill up user information
    cy.get('[data-test="firstName"]').should('be.visible').type(information.firstName)
    cy.get('[data-test="lastName"]').should('be.visible').type(information.lastName)
    cy.get('[data-test="postalCode"]').should('be.visible').type(information.zipCode)
    //continue to item validation
    cy.get('[data-test="continue"]').should('be.visible').click();
    cy.url().should('include', '/checkout-step-two.html')

    //checkout final step
    cy.get('[data-test="finish"]').should('be.visible').click();
    cy.url().should('include', '/checkout-complete.html')

    //thank you message should be visible
    cy.get('body').should('contain.text', 'Thank you for your order!')

    //go back to home page
    cy.get('[data-test="back-to-products"]').should('be.visible').click();
    cy.url().should('include', '/inventory.html')
});

Cypress.Commands.add('assertCheckoutCancelButton', () => {
    //redirect to checkout
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.url().should('include', '/checkout-step-one.html')

    //continue to item validation
    cy.get('[data-test="cancel"]').should('be.visible').click();
    cy.url().should('include', '/cart.html')

});
Cypress.Commands.add('assertCheckoutOverViewCancelButton', (information) => {
    //redirect to checkout
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.url().should('include', '/checkout-step-one.html')
    // fill up user information
    cy.get('[data-test="firstName"]').should('be.visible').type(information.firstName)
    cy.get('[data-test="lastName"]').should('be.visible').type(information.lastName)
    cy.get('[data-test="postalCode"]').should('be.visible').type(information.zipCode)
    //continue to item validation
    cy.get('[data-test="continue"]').should('be.visible').click();
    cy.url().should('include', '/checkout-step-two.html')

    //checkout final step
    cy.get('[data-test="cancel"]').should('be.visible').click();
    cy.url().should('include', '/inventory.html')

});