const html = require('choo/html')
const css = require('sheetify')
const debounce = require('lodash/debounce')

css('bulma/css/bulma.css')

const prefix = css`
  :host {
    width: 100%;
    height: 500px;
    display: block;
    overflow: auto;
  }
`

module.exports = function view (state, emit) {
  const rowHeight = 41
  const tableHeight = 500
  const startRowIndex = Math.floor(state.scrollTop / rowHeight)
  const maxVisibleRows = Math.ceil(tableHeight / rowHeight) // round up
  const maxRowIndex = state.contacts.length - 1
  const endRowIndex = Math.min(maxRowIndex, startRowIndex + maxVisibleRows)
  const remainingRows = state.contacts.length - endRowIndex
  const rows = state.contacts.slice(startRowIndex, endRowIndex + 1)
  const topPadding = startRowIndex * rowHeight
  const bottomPadding = remainingRows * rowHeight

  const onScrollDebounced = debounce(onScroll, 25)

  console.log({startRowIndex, endRowIndex, topPadding, bottomPadding})

  return html`
    <body>
      <table class="table ${prefix}" onscroll=${onScrollDebounced}>
        <tbody>
          ${paddingRow(topPadding)}
          ${rows.map(tableRow)}
          ${paddingRow(bottomPadding)}
        </tbody>
      </table>
    </body>
  `

  function onScroll (evt) {
    emit('scroll', evt.target.scrollTop)
  }

  function paddingRow (padding) {
    if (!padding) return ''

    return html`
      <tr style="height: ${padding}px">
        <td></td>
      </tr>
    `
  }

  function tableRow (contact) {
    return html`
      <tr>
        <td>${contact.id}</td>
        <td>${contact.first_name}</td>
        <td>${contact.last_name}</td>
        <td>${contact.email}</td>
        <td>${contact.gender}</td>
        <td>${contact.ip_address}</td>
      </tr>
    `
  }
}
