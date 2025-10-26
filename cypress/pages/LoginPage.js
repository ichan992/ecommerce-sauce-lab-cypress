export class LoginPage {


    get usernameField() {
        return cy.get('#user-name')
    }

    get passwordField() {
        return cy.get('#password')
    }

    get submitButton() {
        return cy.get('input').contains('Login')
    }
    get errorMessage () {
        return cy.get('[data-test="error"]')
    }


    visit() {
        cy.visit('/') 
    }

    fillUsername(username) {
        this.usernameField.type(username)
    }

    fillPassword(password) {
        this.passwordField.type(password)
    }

    clickSubmit() {
        this.submitButton.click()
    }

    login(username, password) {
        this.fillUsername(username)
        this.fillPassword(password)
        this.clickSubmit()
    }


}