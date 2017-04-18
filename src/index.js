const choo = require('choo')

const app = choo()
app.use(require('./store'))

const isDebug = process.env.NODE_ENV !== 'production'
if (isDebug) app.use(require('choo-log')())

app.route('/', require('./view'))
app.mount('body')
