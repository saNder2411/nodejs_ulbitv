const { Router } = require('../framework')

const router = new Router()

const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
]

router.get('/users', (req, res) => {
  res.send(users)
})

router.post('/users', (req, res) => {
  console.log(req.body)
  const user = req.body
  users.push(user)
  res.send(users)
})

module.exports = router
