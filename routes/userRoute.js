const route = require('express').Router()
const UserController = require('../controllers/userController')

route
  .get('/', UserController.getDatauser)
  .put('/', UserController.update)
  .delete('/', UserController.delete)

module.exports = route