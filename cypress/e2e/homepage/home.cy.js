
describe('Homepage - SauceDemo.com', () => {
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce') // logs in and caches session
    })
    it('should add to cart - Sauce Labs Backpack', () => {
        cy.addToCart('Sauce Labs Backpack');
        cy.addToCart('Sauce Labs Onesie');
        cy.removeFromCart('Sauce Labs Onesie')
        cy.get('.shopping_cart_badge').should('contain', '1')
    })

    it('should remove item from cart - Sauce Labs Onesie', () => {
        cy.addToCart('Sauce Labs Backpack');
        cy.addToCart('Sauce Labs Onesie');
        cy.removeFromCart('Sauce Labs Onesie')

        cy.contains('.inventory_item', "Sauce Labs Onesie")
            .find('button')
            .should('contain', 'Add to cart')
        cy.get('.shopping_cart_badge').should('contain', '1')
    })

    it('should sort items in ascending order', () => {
        cy.assertSortChanged('za', 'az')
    })
    it('should sort items in descending order', () => {

        cy.assertSortChanged('az', 'za')
    })
    it('should redirect to product details - product name', () => {
        cy.assertProductNameRedirect('Sauce Labs Backpack')
    })
      it('should redirect to product details - thumbnail', () => {
        cy.assertThumbnailRedirect('Sauce Labs Backpack')
    })

    it('should sort price low to high', () => {
        cy.assertPriceSort('az', 'lohi')
    })
    it('should sort price high to low', () => {
        cy.assertPriceSort('az', 'hilo')
    })
})
