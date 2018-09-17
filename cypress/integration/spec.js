/// <reference types="cypress" />
describe('test', () => {
  it('solves', () => {
    cy.visit('https://slikts.github.io/js-equality-game')
    cy.get('thead th')
      .each((el$, column) => {
        if (!el$.text()) {
          return
        }
        console.log('el$ column %d is %s', column, el$.text())

        cy.get('tbody tr').each((row$, row) => {
          const x = row$.find('th').text()
          console.log('row X', x)
        })
      })
  })
})
