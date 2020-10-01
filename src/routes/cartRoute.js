const { Router } = require('express')
const { createCart, getCartUser, deleteItem } = require('../controller/cartController')

const router = Router()

router.post('/', createCart)
router.get('/', getCartUser)
router.delete('/:id', deleteItem)

module.exports = router
