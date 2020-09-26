const route = require('express').Router()
const { loginController } = require('../controller/auth')

route.post('/login', loginController)

module.exports = route
