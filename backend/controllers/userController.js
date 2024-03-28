const User = require('../models/userModel')

const createUser = async (req, res) => {
  const body = req.body

  const user = new User({
    username: body.username,
    name: body.name,
  })

  try {
    await user.setPassword(body.password)
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(400).json({error: error.message})
  }
}

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users)
}

module.exports = {
  createUser,
  getAllUsers
}