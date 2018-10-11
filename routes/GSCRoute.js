const route = require('express').Router()
const GCS = require('../helpers/gscUploader')
const targetBountyController = require('../controllers/targetBountyController')
const isLogin = require('../middlewares/isLogin')

route.post('/', isLogin, GCS.multer.single('image'), 
GCS.sendUploadToGCS, targetBountyController.createBounty)

module.exports = route