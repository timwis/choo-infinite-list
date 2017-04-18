module.exports = function store (state, emitter) {
  state.contacts = require('./data.json')
  state.scrollTop = 0

  emitter.on('scroll', (scrollTop) => {
    state.scrollTop = scrollTop
    emitter.emit('render')
  })
}
