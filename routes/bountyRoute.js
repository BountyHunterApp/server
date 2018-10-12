const route = require('express').Router()
const BountyController = require('../controllers/targetBountyController')
const isLogin = require('../middlewares/isLogin')

route.delete('/:id', isLogin, BountyController.deleteBounty)
route.get('/', BountyController.getListBounty)
route.get('/detail/:id', isLogin, BountyController.getDetail)
route.post('/sendinfo/:id', isLogin, BountyController.sendInfo)

module.exports = route