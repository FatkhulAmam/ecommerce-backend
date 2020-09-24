const { Router } = require('express')
const {
  getItem,
  getDetailItem,
  createItem,
  updateItem,
  updateItemPartial,
  deleteItem
} = require('../controller/items')

const uploadHelper = require('../helpers/upload')
const validation = require('../helpers/validationImg')

const router = Router()

router.get('/', getItem)
router.get('/:id', getDetailItem)
router.post('/', uploadHelper.single('pictures'), validation, createItem)
router.put('/:id', updateItem)
router.patch('/:id', updateItemPartial)
router.delete('/:id', deleteItem)

module.exports = router
