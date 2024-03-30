const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  name: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.methods.setPassword = async function(password) {
  if (password.length < 3) {
    throw new Error('Password must be at least 3 characters long')
  }

  const saltRounds = 10
  this.passwordHash = await bcrypt.hash(password, saltRounds)
}

// Show username, name and id
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User;