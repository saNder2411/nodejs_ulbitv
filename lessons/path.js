const path = require('path')

console.log('path.join', path.join('first', 'second', 'third'))

console.log('path.join', path.join(__dirname, 'first', 'second', 'third'))

console.log('path.join', path.join(__dirname, '..', '..'))

console.log('path.resolve', path.resolve('first', 'second', 'third'))

const fullPath = path.resolve(__dirname, 'first', 'second', 'third.js')

console.log('path.parse', path.parse(fullPath))

console.log('path.sep', path.sep)

console.log('path.isAbsolute', path.isAbsolute('first/second'))

console.log('path.basename', path.basename(fullPath))

console.log('path.extname', path.extname(fullPath))

// -------------------------------------------

const siteURL = 'http://localhost:8080/users?id=5123'

const url = new URL(siteURL)

console.log('url', url)
