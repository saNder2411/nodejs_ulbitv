const Emitter = require('events')
const dotenv = require('dotenv')

dotenv.config()

const emitter = new Emitter()

emitter.on('message', (data, a, b) => {
  console.log('You send message: ' + data)
  console.log('a', a)
  console.log('b', b)
})

const MESSAGE = process.env.MESSAGE ?? ''

if (MESSAGE) {
  emitter.emit('message', MESSAGE, 1, 2)
} else {
  emitter.emit('message', 'Message!')
}

const callback = (data) => {
  console.log('You single message: ' + data)
}

emitter.once('single_message', callback)

emitter.emit('single_message', 'Message 1!')

emitter.emit('single_message', 'Message 2!')

emitter.emit('single_message', 'Message 3!')

emitter.removeAllListeners()

emitter.removeListener('single_message', callback)
