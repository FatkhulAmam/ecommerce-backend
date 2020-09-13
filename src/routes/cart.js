const { Router } = require('express')
const { createCart } = require('../controller/cart')

const router = Router()

router.post('/', createCart)

module.exports = router
