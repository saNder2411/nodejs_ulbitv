const dotenv = require('dotenv')

dotenv.config()

console.log(`process id`, process.pid)

console.log(`env`, process.env.PORT)

console.log(`env`, process.env.NODE_ENV)

console.log('argv', process.argv)

if (Math.random() > 0.5) {
  while (true) {}
} else {
  console.log('Kill process!')
  process.exit()
}
