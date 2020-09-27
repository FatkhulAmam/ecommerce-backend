const route = require('express').Router()
const { AdminLoginControl, SellerLoginController, CustommerLoginController } = require('../controller/auth')

route.post('/admin', AdminLoginControl)
route.post('/seller', SellerLoginController)
route.post('/custommer', CustommerLoginController)

module.exports = route
