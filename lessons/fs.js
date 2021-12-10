const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

// fs.mkdirSync(path.resolve(__dirname, 'dir'))

// fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), { recursive: true })

// fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
//   if (err) return console.log(`err`, err)

//   console.log('Dir was created')
// })

// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//   if (err) {
//     throw err
//   }

//   console.log('Dir was remove')
// })

// fs.writeFile(path.resolve(__dirname, 'test.txt'), '5 qwerty 7 9 10 111',(err) => {
//   if (err) {
//     throw err
//   }

//   console.log('File was write')
//   fs.appendFile(path.resolve(__dirname, 'test.txt'), '\nadd to end!',(err) => {
//     if (err) {
//       throw err
//     }

//     console.log('File was write')

//     fs.appendFile(path.resolve(__dirname, 'test.txt'), '\nadd to end!',(err) => {
//       if (err) {
//         throw err
//       }

//       console.log('File was write')
//     })
//   })
// })

const writeFileAsync = async (path, data) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err) => {
      if (err) return reject(err)
      resolve()
    })
  )

const appendFileAsync = async (path, data) =>
  new Promise((resolve, reject) =>
    fs.appendFile(path, data, (err) => {
      if (err) return reject(err)
      resolve()
    })
  )

const readFileAsync = async (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  )

const removeFileAsync = async (path) =>
  new Promise((resolve, reject) =>
    fs.rm(path, (err) => {
      if (err) return reject(err)
      resolve()
    })
  )

// writeFileAsync(path.resolve(__dirname, 'test.txt'), '5 qwerty 7 9 10 111')
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '\n123'))
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '\n456'))
//   .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
//   .then((data) => console.log('readFile', data))
//   .then(() => removeFileAsync(path.resolve(__dirname, 'test.txt')))
//   .then(() => console.log('Remove File'))

const textFileName = 'text.txt'
const countFileName = 'count.txt'

writeFileAsync(path.resolve(__dirname, textFileName), process.env.TEXT)
  .then(() => readFileAsync(path.resolve(__dirname, textFileName)))
  .then((data) => writeFileAsync(path.resolve(__dirname, countFileName), data.split(' ').length.toString()))
  .then(() => removeFileAsync(path.resolve(__dirname, textFileName)))
  .then(() => readFileAsync(path.resolve(__dirname, countFileName)))
  .then((data) => console.log('count', data))
  .catch((err) => console.log(err))

console.log(process.env.TEXT)
