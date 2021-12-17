const http = require('http')
const EventEmitter = require('events')

// endpoints = {
//   '/users': {
//     'GET': handler1,
//     'POST': handler2,
//     'DELETE': handler3,
//   },
//   '/posts': {
//     'GET': handler,
//     'POST': handler2,
//     'DELETE': handler3,
//   }
// }

module.exports = class App {
  constructor() {
    this.emitter = new EventEmitter()
    this.server = this.#createServer()
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
        this.emitter.on(this.#getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method]
          handler(req, res)
        })
      })
    })
  }

  #createServer() {
    return http.createServer((req, res) => {
      let index = 0

      const next = () => {
        if (index < this.middlewares.length) {
          this.middlewares[index++](req, res, next)
        } else {
          const isEmitted = this.emitter.emit(this.#getRouteMask(req.pathname, req.method), req, res)

          if (!isEmitted) {
            res.end(req.url)
          }
        }
      }
      next()

      // let body = ''
      // req.on('data', (chunk) => {
      //   body += chunk
      // })

      // req.on('end', () => {
      //   if (body) {
      //     req.body = JSON.parse(body)
      //   }
      //   this.middlewares.forEach((middleware) => middleware(req, res, () => {}))

      //   const isEmitted = this.emitter.emit(this.#getRouteMask(req.pathname, req.method), req, res)

      //   if (!isEmitted) {
      //     res.end(req.url)
      //   }
      // })
    })
  }

  #getRouteMask(path, method) {
    return `[${path}]:[${method}]`
  }
}
