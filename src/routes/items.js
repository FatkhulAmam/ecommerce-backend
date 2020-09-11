const { Router } = require('express')
const { getItem, getDetailItem, createItem, updateItem, updateItemPartial, deleteItem } = require('../controller/items')

const router = Router()

router.get('/', getItem)
router.get('/:id', getDetailItem)
router.post('/', createItem)
router.put('/:id', updateItem)
router.patch('/:id', updateItemPartial)
router.delete('/:id', deleteItem)

module.exports = router
