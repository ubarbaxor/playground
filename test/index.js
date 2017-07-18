const test = require('ava')

const app = require('../index.js')
test('app properly exports', t => {
  t.truthy(app.front && app.back)
})
