const { App, parseJson } = require('./framework')
const router = require('./src/user_router')

const PORT = process.env.PORT ?? 5000

const app = new App()

app.use(parseJson)

app.addRouter(router)

app.listen(PORT, () => console.log(`Server started at: http://localhost:${PORT}`))
