const route = require('express').Router()
const BountyController = require('../controllers/targetBountyController')
const isLogin = require('../middlewares/isLogin')

route.delete('/:id', isLogin, BountyController.deleteBounty)
route.get('/', BountyController.getListBounty)

module.exports = route