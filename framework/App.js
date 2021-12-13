const http = require('http')
const EventEmitter = require('events')

// endpoints = {
//   '/users': {
//     'GET': handler
//   },
//   '/posts': {
//     'GET': handler
//   }
// }

module.exports = class App {
  constructor() {
    this.emitter = new EventEmitter()
    this.server = this._createServer()
    this.middlewares = []
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

  listen(port, cb) {
    this.server.listen(port, cb)
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path]

      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method]
          handler(req, res)
        })
      })
    })
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })

      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body)
        }
        this.middlewares.forEach((middleware) => middleware(req, res))
        const isEmitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res)

        if (!isEmitted) {
          res.end(req.url)
        }
      })
    })
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`
  }
}
