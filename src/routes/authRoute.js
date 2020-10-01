const route = require('express').Router()
const { AdminLoginControl, SellerLoginController, CustommerLoginController, registerController } = require('../controller/authController')

route.post('/login/admin', AdminLoginControl)
route.post('/login/seller', SellerLoginController)
route.post('/login/custommer', CustommerLoginController)
route.post('/register/:role', registerController)

module.exports = route
