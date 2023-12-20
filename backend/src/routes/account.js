const express = require('express')
const router = express.Router()
const accountController = require('../controllers/account-controller')

router
  .route('/user')
  .put(accountController.updateUser)

router
  .route('/users')  
  .get(accountController.getUsers)

module.exports = router
