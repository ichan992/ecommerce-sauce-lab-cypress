import { LoginPage } from '../pages/LoginPage'
const loginPage = new LoginPage();
describe('Login Test - SauceDemo.com', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  it('login should be successful', () => {
    loginPage.fillUsername('standard_user')
    loginPage.fillPassword('secret_sauce')
    loginPage.errorMessage.should('not.exist')
    loginPage.submitButton.click()

    cy.url().should('eq', `${Cypress.config('baseUrl')}/inventory.html`)
  })

  it('should show error when username is empty', () => {
    loginPage.fillPassword('secret_sauce')
    loginPage.submitButton.click()
    loginPage.errorMessage.should('be.visible').contains('Epic sadface: Username is required')
  })

  it('should show error when password is empty', () => {
    loginPage.fillUsername('standard_user')
    loginPage.submitButton.click()
    loginPage.errorMessage.should('be.visible').contains('Epic sadface: Password is required')
  })
  it('should display error when invalid credentails', () => {
    loginPage.fillUsername('eqteq');
    loginPage.fillPassword('teqteqyqe');
    loginPage.submitButton.click()
    loginPage.errorMessage.should('be.visible').contains('Epic sadface: Username and password do not match any user in this service')

  })
})
