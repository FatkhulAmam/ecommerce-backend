const { Router } = require('express')
const { createCart, getCart, getCartUser, deleteItem } = require('../controller/cartController')

const router = Router()

router.post('/', createCart)
router.get('/', getCart)
router.get('/:id', getCartUser)
router.delete('/:id', deleteItem)

module.exports = router
