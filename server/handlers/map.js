let defaultUsername = 'stranger'
let username = ''

const greet = (req, res) => {
  res.end(`Hello ${username || defaultUsername}!`)
}

const setUsername = (req, res) => {
  username = req.query.username || ''
  res.end(`You are called: ${username}`)
}

const pong = (req, res) => req.pipe(res)//(req.body)

const testMap = {
  'ping': pong,
  user: {
    get: greet,
    set: setUsername
  }
}

const testNode = (node, req) => {
  console.log('testNode testing ', node)
  if (testMap[req.method])
    return testMap[req.method]
  if (typeof(node) === 'function')
    return node
  return (req, res) => { res.end('Not found') }
}

const splitPath = url => url.split('/').filter(x => x)

const objPath = require('../helpers/objPath')

const MapHandler = map => (req, res, next) => {
  let path = splitPath(req.parsedUrl.pathname)
  let node = objPath(testMap, path)

  console.log('PATH, MAP, NODE in mapHandler')
  console.log(path)
  console.log(testMap)
  console.log(node)

  let handler = testNode(node, req)
  console.log('in mapHandler, handler : ', handler)
  if (!handler)
    return next()
  else
    handler(req, res, next)
}

module.exports = MapHandler(testMap)