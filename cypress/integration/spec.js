/// <reference types="cypress" />
it('js-equality', () => {
  cy.visit('https://slikts.github.io/js-equality-game')
  // get all values to compare
  let values = []
  cy.get('thead th')
    .each((el$) => {
      if (!el$.text()) {
        return
      }
      // only '{}' gives back undefined, but should be an empty object {}
      values.push(eval(el$.text()))
    })
    .then(() => {
      console.log('%d value(s) to compare', values.length)
      console.log(values)
      assert(values.length > 0, 'expected some values to compare')
    })
    .then(() => {
      let clicks = 0
      cy.get('tbody td').each((cell$, k) => {
        const row = Math.floor(k / values.length)
        const col = k % values.length
        if (col <= row) {
          // only interested in filling the upper right triangle of the field
          return
        }

        const x = values[row]
        const y = values[col]
        console.log(x, '==', y, '?', x == y)

        if (x == y) {
          // click on the cell
          cy.wrap(cell$).click()
          // and make sure the field has registered our click
          clicks += 1
          cy.contains('.Results-flags .Score', clicks)
        }
      })
    })
    .then(() => {
      cy.log('time to find out the truth ...')
      cy.contains('Show Results').click()
      // because we cannot `eval({})` correctly, we miss 9% of the grade 🙃
      cy.contains('.Results-face', '91% correct')
    })
})
