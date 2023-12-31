const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  birthDate: String,
  gender: String,
  photo: String,
  accessToken: String,
  refreshToken: String
})

module.exports = mongoose.model('User', userSchema)
