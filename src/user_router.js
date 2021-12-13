const { Router } = require('../framework')
const { getUsers, createUser } = require('./user_controller')

const router = new Router()

router.get('/users', getUsers)

router.post('/users', createUser)

module.exports = router
