const TargetBounty = require('../models/targetBountyModel')
const nodemailer = require('nodemailer')

class TargetBountyController {

  static getDetail(req, res) {
    TargetBounty.findOne({
        _id: req.params.id
      })
      .then(data => {
        res.status(200).json({
          status: 'success',
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

  static getListBounty(req, res) {
    TargetBounty.find()
      .then(data => {
        res.status(200).json({
          status: 'success',
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

  static createBounty(req, res) {

    let data = {
      name: req.body.name, // rudy
      avatar: req.file.cloudStoragePublicUrl,
      gender: req.body.gender, // rudy
      age: req.body.age, //rudy
      hairColor: req.body.hairColor,
      detail: req.body.detail,
      lastSeen: req.body.lastSeen,
      bountyPrice: req.body.bountyPrice,
      contactInfo: req.body.contactInfo,
      userId: req.decoded.id
    }

    let targetBounty = new TargetBounty(data)

    targetBounty.save()
      .then(data => {
        res.status(201).json({
          status: 'success',
          message: 'Bounty event created'
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static deleteBounty(req, res) {

    TargetBounty.deleteOne({
        _id: req.params.id
      })
      .then(data => {
        res.status(200).json({
          status: 'success',
          message: 'success when delete bounty'
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: 'error delete bounty'
        })
      })

  }

  static sendInfo (req, res) {
    TargetBounty.findById(req.params.id)
    .populate('userId')
    .then(data => {
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'backgroundjobtest@gmail.com',
              pass: process.env.EMAIL_PASSWORD
          }
      })
      let mailOptions = {
          from: 'backgroundjobtest@gmail.com',
          to: data.userId.email,
          subject: 'Someone Find Your Target',
          html: 
          `
            <h2>Hi, ${data.userId.name}</h2>
            <p> We just received an information about your target (${data.name}), this is the information:</p><br>
            <p>${req.body.info}</p><br>
            <h4>Thank you very much for your trust in our service,<h4>
            <h3>Bounty Hunter App Developer Team</h3>
          `
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          } else {
              console.log('Message sent: %s', info.messageId);
              done()
          }
      });
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
  }

}

module.exports = TargetBountyController