// Readable - read
// Writable - wright
// Duplex - read and wright
// Transform - read and wright, can change data on read
const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'text.txt')

// fs.readFile(filePath, (err, data) => {
//   if (err) {
//     throw err
//   }
//   console.log('Buffer =>', data)
// })

const stream = fs.createReadStream(filePath)

stream.on('data', (chunk) => {
  console.log('Buffer chunk =>', chunk)
})

stream.on('open', () => console.log('Start reading'))

stream.on('end', () => console.log('End reading'))

stream.on('error', (err) => console.log('Error', err))

const writableStream = fs.createWriteStream(path.resolve(__dirname, 'text2.txt'))

for (let i = 0; i <= 20; i++) {
  writableStream.write(i + '\n')
}

writableStream.end()
// writableStream.close()
// writableStream.destroy()
writableStream.on('error', (err) => console.log(err))

const http = require('http')

http.createServer((req, res) => {
  // req - readable stream
  // res - writable stream

  // Send file to user
  const stream = fs.createReadStream(filePath)

  // Стрим закончит читать раньше чем user скачает!
  // stream.on('data', (chunk) => res.write(chunk))
  // stream.on('end', () => res.end())

  // Pipe for synchronization
  stream.pipe(res)
})
