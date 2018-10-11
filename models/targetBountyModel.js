const mongoose = require('mongoose')
const Schema = mongoose.Schema

const targetBountySchema = new Schema({
  name: {
    type: String,
    default: 'Anonymus'
  },
  avatar: {
    type: String,
    required: [true, 'Avatar required']
  },
  gender: {
    type: String,
    default: 'Unrecognize'
  },
  age: {
    type: Number,
    default: 0
  },
  detail: String,
  LastSeen: String,
  bountyPrice: Number,
  contactInfo: String,
  hairColor: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const TargetBounty = mongoose.model('TargetBounty', targetBountySchema)

module.exports = TargetBounty