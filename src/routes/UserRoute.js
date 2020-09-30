const route = require('express').Router()
const userController = require('../controller/userController')
const { adminMiddleware } = require('../middlewares/auth')

route.get('/', adminMiddleware, userController.readUser)
route.post('/', userController.creatUser)
route.put('/', userController.updateUser)

module.exports = route
