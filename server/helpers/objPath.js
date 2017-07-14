const testObj = {
  "i am": 'simple',
  answer: 42,
  a: {
    little: [ 'nesting', 'really?' ]
  },
  and: {
    another: { nested: ['array'] } }
  }

const objPath = (o, path) => (console.log('path in oPath :', path,'\no in oPath :'), console.log(o),
path // check args
  ? path.reduce && path.reduce((acc, val, curr, arr) => acc[val] || acc, o)
  : path => objPath(o, path))// curry if only 1 arg is provided

const trimSlashes = str => str.replace(/^\/+|\/+$/g, '')
objPath.fromUrl = url => trimSlashes(url).split('/')
objPath.test = (success = 'objPath test OK') => {
  const test = require('assert')
  let pathTest = objPath(testObj)
  // curried
  test.strictEqual(typeof(pathTest), 'function')
  // simple
  test.strictEqual(pathTest(['i am']), 'simple')
  test.strictEqual(pathTest(['answer']), 42)
  test.deepStrictEqual(pathTest(['and','another']), { nested: ['array']},
    'Invalid resolution in objPath')
  // URL tests
  const u = x => JSON.stringify(objPath.fromUrl(x))
  // console.log(`u('toto')`, u('toto'))
  test.strictEqual(u('/etc/toto'), JSON.stringify(['etc', 'toto']))
  test.strictEqual(u('etc/toto'), JSON.stringify(['etc', 'toto']))
  test.strictEqual(u('/ etc/ toto '), JSON.stringify([' etc', ' toto ']))
  // integration
  test.deepStrictEqual(pathTest(u('/', testObj)))
  test.deepStrictEqual(pathTest(u('/ i am/', 'simple')))
  test.deepStrictEqual(pathTest(u('and/another/nested/0', 'array')))

  console.log(success)
  return(objPath)
}

// module.exports = objPath.test()
module.exports = objPath
