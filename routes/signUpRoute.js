const route = require('express').Router()
const SignUpController = require('../controllers/signUpController')
const GCS = require('../helpers/gscUploader')
const safeSearch = require('../middlewares/safeSearch')

route.post('/', GCS.multer.single('image'),
  GCS.sendUploadToGCS, safeSearch, SignUpController.signUp)

module.exports = route