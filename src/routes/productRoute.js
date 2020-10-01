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
const authMiddleware = require('../middlewares/auth')

const uploadHelper = require('../helpers/upload')
const validationImage = require('../helpers/validationImg')
const router = Router()

router.get('/', getItem)
router.get('/:id', getDetailItem)

// manage product as a loged user
router.post('/', authMiddleware, uploadHelper.array('pictures', 5), validationImage, createItem)

router.put('/:id', authMiddleware, updateItem)

router.patch('/:id', authMiddleware, updateItemPartial)

router.delete('/:id', authMiddleware, deleteItem)

module.exports = router
