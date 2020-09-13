const { Router } = require('express')
const { createCart, getCart, getCartUser } = require('../controller/cart')

const router = Router()

router.post('/', createCart)
router.get('/', getCart)
router.get('/:id', getCartUser)

module.exports = router
