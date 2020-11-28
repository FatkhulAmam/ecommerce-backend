const { Router } = require('express')
const {
  getItem,
  getDetailItem,
  createItem,
  updateItem,
  updateItemPartial,
  deleteItem,
  addImageProduct
} = require('../controller/productController')

// middleware
// const authMiddleware = require('../middlewares/auth')

const uploadHelper = require('../helpers/upload')
const router = Router()

router.get('/', getItem)
router.get('/:id', getDetailItem)
router.post('/', createItem)
router.post('/image/:id', uploadHelper.single('pictures'), addImageProduct)

router.put('/:id', updateItem)

router.patch('/:id', uploadHelper.array('pictures', 4), updateItemPartial)

router.delete('/:id', deleteItem)

module.exports = router
