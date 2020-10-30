const router = require('express').Router()
const { addMethode } = require('../controller/paymentMethodeController')

router.post('/', addMethode)

module.exports = router
