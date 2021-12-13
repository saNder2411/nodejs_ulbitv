const mongoose = require('mongoose')
const { App, parseJson, parseURL } = require('./framework')
const router = require('./src/user_router')

const PORT = process.env.PORT ?? 5000

const app = new App()

app.use(parseJson)

app.use(parseURL(`http://localhost:${PORT}`))

app.addRouter(router)

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://user001:sander123@cluster0.eq3f7.mongodb.net/simpleDB?retryWrites=true&w=majority'
    )
    app.listen(PORT, () => console.log(`Server started at: http://localhost:${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()
