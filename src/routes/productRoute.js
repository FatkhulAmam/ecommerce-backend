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

// const uploadHelper = require('../helpers/upload')
// const validationImage = require('../helpers/validationImg')
const router = Router()

router.get('/', getItem)
router.get('/:id', getDetailItem)

// manage product as a loged user
router.post('/', createItem)

router.put('/:id', updateItem)

router.patch('/:id', updateItemPartial)

router.delete('/:id', deleteItem)

module.exports = router
