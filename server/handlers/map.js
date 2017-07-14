let defaultUsername = 'stranger'
let username = ''

const greet = (req, res) => {
  res.end(`Hello ${username || defaultUsername}!`)
}

const setUsername = (req, res) => {
  username = req.query.username || ''
  req.end(username)
}

const pong = (req, res) => req.pipe(res)//(req.body)

const testMap = {
  'GET': greet,
  'set': setUsername,
  'ping': pong
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
  let path = splitPath(req.url)
  let node = objPath(testMap, path)

  console.log('PATH, MAP, NODE in mapHandler')
  console.log(path)
  console.log(testMap)
  console.log(node)

  let handler = testNode(node, req)
  console.log('in mapHandler, handler : ', handler)
  return next( testNode(node, req) )
}

module.exports = MapHandler(testMap)