const User = require('../models/userModel')

class UserController {
  
  static getDatauser (req, res) {
      User.find({ _id: req.decoded.id })
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: {
            id: data[0]._id,
            name: data[0].name
          }
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
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
