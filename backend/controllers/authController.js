const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const express = require('express');
const app = express();
require('dotenv').config();

const loginUser = app.post('/api/login', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = {
  loginUser
}