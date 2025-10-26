
describe('Cart - SauceDemo.com', () => {
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce') // logs in and caches session
    })
    // it('should go to cart Page', () => {
    //     cy.goToCart()
    // })
    // it('should continue Shopping redirect to home page', () => {
    //     cy.assertContinueShoppingRedirectBack()
    // })
    //  it('should item remove from cart', () => {
    //     cy.assertRemoveItemFromCart('Sauce Labs Backpack')
    // })
    it('should checkout', () => {
        cy.addToCart('Sauce Labs Backpack')
        cy.addToCart('Sauce Labs Bike Light')
        cy.goToCart()
        const information = {
            firstName: 'Mark',
            lastName: 'Vidal',
            zipCode: '6146'
        }
        cy.assertCheckout(information)
    })

    it('should validation working - firstname', () => {
        cy.addToCart('Sauce Labs Backpack')
        cy.addToCart('Sauce Labs Bike Light')
        cy.goToCart()
        const information = {

            lastName: 'Vidal',
            zipCode: '6146'
        }
        cy.assertValidationFirstName(information)
    })
    it('should validation working - last name', () => {
        cy.addToCart('Sauce Labs Backpack')
        cy.addToCart('Sauce Labs Bike Light')
        cy.goToCart()
        const information = {
            firstName: 'Mark',
            zipCode: '6146'
        }
        cy.assertValidationLastName(information)
    })
    it('should validation working - zipCode', () => {
        cy.addToCart('Sauce Labs Backpack')
        cy.addToCart('Sauce Labs Bike Light')
        cy.goToCart()
        const information = {
            firstName: 'Mark',
            lastName: 'Vidal',
        }
        cy.assertValidationZipCode(information)
    })
    it('should validation working - all', () => {
        cy.addToCart('Sauce Labs Backpack')
        cy.addToCart('Sauce Labs Bike Light')
        cy.goToCart()

        cy.assertValidationAll()
    })

    it('should checkout cancel button working ', () => {
        cy.addToCart('Sauce Labs Backpack')
        cy.addToCart('Sauce Labs Bike Light')
        cy.goToCart()

        cy.assertCheckoutCancelButton()
    })
    it('should checkout overview cancel button working ', () => {
        cy.addToCart('Sauce Labs Backpack')
        cy.addToCart('Sauce Labs Bike Light')
        cy.goToCart()

        const information = {
            firstName: 'Mark',
            lastName: 'Vidal',
            zipCode:'412541'
        }
        cy.assertCheckoutOverViewCancelButton(information)
    })

})
