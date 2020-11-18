const { Router } = require('express')
const {
  getItem,
  getDetailItem,
  createItem,
  updateItem,
  updateItemPartial,
  deleteItem
} = require('../controller/productController')

// middleware
// const authMiddleware = require('../middlewares/auth')

const uploadHelper = require('../helpers/upload')
const router = Router()

router.get('/', getItem)
router.get('/:id', getDetailItem)

// manage product as a loged user
router.post('/', uploadHelper.array('pictures', 4), createItem)

router.put('/:id', updateItem)

router.patch('/:id', updateItemPartial)

router.delete('/:id', deleteItem)

module.exports = router
