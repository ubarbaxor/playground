const http = require('http')

const config = {
  host: 'localhost',
  port: 8877,
}

const onListen = ({host, port}) => {
  console.log(`Listening on ${host}:${port}`)
}

const handler = require('./handlers')

const srv = http.createServer(handler)
srv.listen(config.port, config.host, onListen(config))
