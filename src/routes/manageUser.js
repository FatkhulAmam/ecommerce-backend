const route = require('express').Router()
const userController = require('../controller/userController')

route.get('/', userController.read)
route.post('/', userController.creat)

module.exports = route
