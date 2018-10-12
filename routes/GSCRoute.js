const route = require('express').Router()
const GCS = require('../helpers/gscUploader')
const safeSearch = require('../middlewares/safeSearch')
const faceIdentity = require('../middlewares/faceIdentity')
const targetBountyController = require('../controllers/targetBountyController')


const isLogin = require('../middlewares/isLogin')
 
route.post('/', isLogin, GCS.multer.single('image'), 
GCS.sendUploadToGCS, safeSearch, faceIdentity.getInfoImage, targetBountyController.createBounty)

module.exports = route