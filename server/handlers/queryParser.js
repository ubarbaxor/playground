const url = require('url')
const qs = require('querystring')

const handler = (req, res, next) => {
  req.parsedUrl = url.parse(req.url, true)
  console.log(req.parsedUrl)
  req.query = req.parsedUrl.query

// console.log('in queryParser, next: ', next)
  next()
}

handler.test = url => {
  const test = require('assert')
  url = url || '/root/test?firstParam=one&another=true&a%20number=42'
  let req = {url}

  const next = x => {
    test(req, 'no req ?!!')
    test(req.url, 'No URL in request')
    test(req.parsedUrl, 'No parsedUrl in req')
    test.equal(req.parsedUrl.pathname, '/root/test', 'Invalid pathname')
    test(!x)
  }


  handler(req, {}, next)
  return handler
}

module.exports = handler.test()
