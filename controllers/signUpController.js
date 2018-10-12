const User = require('../models/userModel')

class SignUpControler {

  static signUp(req, res) {
    let data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: req.file.cloudStoragePublicUrl
    }

    let user = new User(data)

    user.save()
      .then(data => {
        res.status(201).json({
          status: 'success',
          message: 'creating new user success',
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })

  }

}

module.exports = SignUpControler