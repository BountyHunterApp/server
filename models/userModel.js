const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password required']
  },
  avatar: {
    type: String,
    default: 'https://storage.googleapis.com/bountyhunter/facebook-default-no-profile-pic1.jpg'
  }
})

userSchema.post('validate', doc => {
  let hash = bcrypt.hashSync(doc.password, Number(process.env.HASH_PW))
  doc.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User