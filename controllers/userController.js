const User = require('../models/userModel')

class UserController {

  static getDatauser(req, res) {
    User.findOne({
        _id: req.decoded.id
      })
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: {
            id: data._id,
            name: data.name,
            avatar: data.avatar
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

  static update(req, res) {
    res.status(200).json({
      status: 'success',
    })
  }

  static delete(req, res) {
    res.status(200).json({
      status: 'success',
    })
  }

}

module.exports = UserController