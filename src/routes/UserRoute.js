const route = require('express').Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middlewares/auth')

route.get('/', authMiddleware, userController.readUser)
route.post('/', userController.creatUser)
route.put('/', userController.updateUser)

module.exports = route
