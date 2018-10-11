const route = require('express').Router()
const GCS = require('../helpers/gscUploader')
const targetBountyController = require('../controllers/targetBountyController')
const isLogin = require('../middlewares/isLogin')
const safeSearch = require('../middlewares/safeSearch')

route.post('/', isLogin, GCS.multer.single('image'), 
GCS.sendUploadToGCS, safeSearch, targetBountyController.createBounty)

module.exports = route