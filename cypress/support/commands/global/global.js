import { LoginPage } from "../../../pages/LoginPage"


Cypress.Commands.add('login', (username, password) => {
    const loginPage = new LoginPage()
    loginPage.visit()
    loginPage.login(username, password)
    cy.url().should('include', '/inventory.html')
})

Cypress.Commands.add('loginSession', () => {
    cy.session('standard_user', () => {
        cy.visit('/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
    })
})

Cypress.Commands.add('addToCart', (product) => {
    cy.contains('.inventory_item', product)
        .find('button')
        .contains('Add to cart')
        .click();
});

Cypress.Commands.add('goToCart', () => {
    cy.get('[data-test="shopping-cart-link"]').should('be.visible').click()
});


Cypress.Commands.add('removeFromCart', (product) => {
    cy.contains('.inventory_item', product)
        .find('button')
        .contains('Remove')
        .click();
});
Cypress.Commands.add('getCartLength', () => {
    return cy.get('.shopping_cart_badge')
})
