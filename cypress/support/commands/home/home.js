// 🔽 Select sort option
Cypress.Commands.add('selectSort', (option) => {
    cy.get('.product_sort_container').select(option)
})

// 📦 Get all visible item names
Cypress.Commands.add('getItems', () => {
    return cy.get('[data-test="inventory-item-name"]').then($els => {
        return [...$els].map(el => el.innerText.trim())
    })
})

Cypress.Commands.add('getItemsPrice', () => {
    return cy.get('[data-test="inventory-item-price"]').then($els => {
        return [...$els].map((el) => parseFloat(el.innerText.replace('$', '').trim()))
    })
})

Cypress.Commands.add('getProductTitleLink', (product) => {
    cy.contains('[data-test="inventory-item-name"]', product).click();
});

Cypress.Commands.add('getProductThumbnail', (product) => {
    cy.contains('.inventory_item', product).find('.inventory_item_img a').click();
});


Cypress.Commands.add('assertThumbnailRedirect', (product) => {
    cy.getProductThumbnail(product)
    cy.get('body').should('contain.text', 'Back to products')
    cy.get('body').should('contain.text', product)
});
Cypress.Commands.add('assertProductNameRedirect', (product) => {
    cy.getProductTitleLink(product)
    cy.get('body').should('contain.text', 'Back to products')
    cy.get('body').should('contain.text', product)
});
// Compare sorting between two options (ZA then AZ)

Cypress.Commands.add('assertPriceSort', (from, to) => {
    cy.selectSort(from)
    cy.get('.product_sort_container').should('have.value', from)
    // Capture original order
    cy.getItemsPrice().then((originalItems) => {
        cy.wrap(originalItems).as('originalItems')
    })

    // Change sort
    cy.selectSort(to)
    cy.get('.product_sort_container').should('have.value', to)

    // Get new order and compare
    cy.getItemsPrice().then((sortedItems) => {
        cy.get('@originalItems').then((originalItems) => {

            let expectedSorted = [...originalItems].sort((a, b) => a - b)

            // If sorting to descending (Z→A), reverse the expected order
            if (to.toLowerCase() === 'hilo') {
                expectedSorted = expectedSorted.reverse()
            }
            expect(sortedItems).to.deep.equal(expectedSorted)
        })
    })
})

Cypress.Commands.add('assertSortChanged', (from, to) => {
    cy.selectSort(from)
    cy.get('.product_sort_container').should('have.value', from)

    // Capture original order
    cy.getItems().then((originalItems) => {
        cy.wrap(originalItems).as('originalItems')
    })

    // Change sort
    cy.selectSort(to)
    cy.get('.product_sort_container').should('have.value', to)

    // Get new order and compare
    cy.getItems().then((sortedItems) => {
        cy.get('@originalItems').then((originalItems) => {
            // Sort alphabetically (case-insensitive)
            let expectedSorted = [...originalItems].sort((a, b) =>
                a.localeCompare(b, undefined, { sensitivity: 'base' })
            )

            // If sorting to descending (Z→A), reverse the expected order
            if (to.toLowerCase() === 'za') {
                expectedSorted = expectedSorted.reverse()
            }
            expect(sortedItems).to.deep.equal(expectedSorted)
        })
    })
})