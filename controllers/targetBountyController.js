const TargetBounty = require('../models/targetBountyModel')

class TargetBountyController {

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

    TargetBounty.deleteOne({ _id: req.params.id })
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

}

module.exports = TargetBountyController