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
const { adminMiddleware, sellerMiddleware } = require('../middlewares/auth')

const uploadHelper = require('../helpers/upload')
const validationImage = require('../helpers/validationImg')
const router = Router()

router.get('/', getItem)
router.get('/:id', getDetailItem)

// manage product as a loged user
router.post('/', adminMiddleware, uploadHelper.array('pictures', 5), validationImage, createItem)
router.post('/', sellerMiddleware, /* uploadHelper.array('pictures', 5), validationImage */ createItem)

router.put('/:id', adminMiddleware, updateItem)
router.put('/:id', sellerMiddleware, updateItem)

router.patch('/:id', adminMiddleware, updateItemPartial)
router.patch('/:id', sellerMiddleware, updateItemPartial)

router.delete('/:id', adminMiddleware, deleteItem)
router.delete('/:id', sellerMiddleware, deleteItem)

module.exports = router
