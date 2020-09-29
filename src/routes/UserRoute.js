const route = require('express').Router()
const userController = require('../controller/userController')
const { adminMiddleware } = require('../middlewares/auth')

route.get('/', adminMiddleware, userController.read)
route.post('/', userController.creat)

module.exports = route
