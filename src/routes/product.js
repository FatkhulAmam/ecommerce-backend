const { Router } = require('express')
const {
  getItem,
  getDetailItem,
  createItem,
  updateItem,
  updateItemPartial,
  deleteItem
} = require('../controller/product')

const uploadHelper = require('../helpers/upload')
const validationImage = require('../helpers/validationImg')

const router = Router()

router.get('/', getItem)
router.get('/:id', getDetailItem)
router.post('/', uploadHelper.array('pictures', 5), validationImage, createItem)
router.put('/:id', updateItem)
router.patch('/:id', updateItemPartial)
router.delete('/:id', deleteItem)

module.exports = router
