const router = require('express').Router()
const { createPayment } = require('../controller/paymentController')

router.post('/payment', createPayment)

module.exports = router
