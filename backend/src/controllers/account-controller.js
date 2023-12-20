require('dotenv').config()
const bcrypt = require('bcrypt')
const salt = process.env.saltRounds || 10
const User = require('../models/user.model')
const response = require('../types/response')
const userDestructuring = require('../helpers/userDestructuring')
const usersDestructuring = require('../helpers/usersDestructuring')

const updateUser = async (req, res) => {
  try {
    const { name, password } = req.fields
    const { userId } = req.body
    const { photo } = req.files
    
      if (name && password && photo) {
            const hashPass = await bcrypt.hash(password, Number(salt))
            const fileName = photo.path.split('/').pop()
            
            await User.findOneAndUpdate({ _id: userId }, { 
              name, 
              password: hashPass, 
              photo: fileName,
            })
            res.status(201).json(response('Successfully', '', userDestructuring({ name, photo: fileName })))
        } else {
            res.status(401).json(response('Error', 'All fields must be filled'))
        }
  } catch (e) {
    res.status(500).json(response('Error', String(e)))
  }
}

const getUsers = async (req, res) => {
  try {
      const { userId } = req.body
      const users = await User.find()
      const resultUsers = users.filter((user) => String(user._id) !== String(userId))
      res.status(201).json(response('Successfully', '', usersDestructuring(resultUsers)))
        
  } catch (e) {
    res.status(500).json(response('Error', String(e)))
  }
}

module.exports = {
  updateUser,
  getUsers
}
