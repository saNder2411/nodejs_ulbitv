const User = require('./user_model')

const getUsers = async (req, res) => {
  if (req.params.id) return res.send(await User.findById(req.params.id))

  res.send(await User.find())
}

const createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.send(user)
}

module.exports = { getUsers, createUser }
