const User = require('../models/userModel')

class UserController {
  
  static getDatauser (req, res) {
    res.status(200).json({
      status: 'success',
    }) 
  }

  static update (req, res) {
    res.status(200).json({
      status: 'success',
    }) 
  }

  static delete (req, res) {
    res.status(200).json({
      status: 'success',
    }) 
  }

}

module.exports = UserController