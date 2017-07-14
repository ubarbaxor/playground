const logger = (req, res, next) => {
  req.ip = req.ip
    || req.headers['x-forwarded-for']
    || req.connection.remoteAddress
  console.log(req.method, req.url, 'from', req.ip)
  res.on('end', () => console.log(req.statusCode))

  console.log('next', next)
  next()
}

module.exports = logger
