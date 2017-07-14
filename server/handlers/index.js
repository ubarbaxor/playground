const logger = require('./logger')
const queryParser = require('./queryParser')
const map = require('./map')
const _ = require('../helpers')

// const routes = {
//   // Stupid default GET
//   GET: (req, res) => res.end(req.url),
//   ping: {
//     GET: (req, res) => res.end('pong.')
//   }
// }

const handlers = [
  logger,
  queryParser,
  map,//(routes) // let map use default routes for tests
  () => res.end('not found.')
]
// console.log(handlers)

const handler = (req, res) => {
  let current = 0
  // handlers.forEach(h => h(req, res))
  // Fallback :
  // if (!res.length) {
  //   res.statusCode = 404
  //   res.end('Not found.')
  // }
  const next = fn => {
    console.log(current, handlers[current])
    if (fn)
      { handlers.splice(current, 0, fn) }// do next
    // current ++ // Increment callee index
    handlers[current++](req, res, next) // call
  }
  next()
}

module.exports = handler
