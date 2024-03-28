const supertest = require('supertest')
const app = require('../index') // Import your Express app
const User = require('../models/userModel') // Import your User model

const api = supertest(app)

// This will run before each test, making sure the database is empty
beforeEach(async () => {
  await User.deleteMany({})
})

test('user with invalid username is not created', async () => {
  const newUser = {
    username: 'ab', // username less than 3 characters
    password: 'password',
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(response.body.error).toContain('Username must be at least 3 characters long')

  const usersAtEnd = await User.find({})
  expect(usersAtEnd).toHaveLength(0) // No user should have been created
})

test('user with invalid password is not created', async () => {
  const newUser = {
    username: 'username',
    password: 'ab', // password less than 3 characters
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(response.body.error).toContain('Password must be at least 3 characters long')

  const usersAtEnd = await User.find({})
  expect(usersAtEnd).toHaveLength(0) // No user should have been created
})

// Add more tests as needed