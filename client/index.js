const fs = require('fs'),
  http = require('http'),
  path = require('path')

const mime = require('mime')

const root = 'public/'
const PORT = 8080

const toPath = url => {
  const filePath = path.resolve(root + url)

  return fs.existsSync(filePath) &&
    ( fs.statSync(filePath).isDirectory()
    ? path.join(filePath, 'index.html')
    : filePath
    )
}

const handleStatic = (req, res) => {
  const filePath = toPath(req.url)

  if (filePath) {
    res.setHeader('content-type', mime.lookup(filePath))
    fs.createReadStream(filePath).pipe(res)
  } else {
    res.statusCode = 404
    res.end(`${req.url} not found :/`)
  }
}

const srv = http.createServer(handleStatic)
srv.listen(PORT, () => console.log(`Static served on ${PORT}`))
