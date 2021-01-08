const { Router } = require('express')
const { getCategory, createCategory, getDetailCategory, deleteCategory } = require('../controller/categoryController')

const router = Router()
const uploadHelper = require('../helpers/upload')

router.get('/', getCategory)
router.post('/', uploadHelper.single('picture'), createCategory)
router.get('/:id', getDetailCategory)
router.delete('/:id', deleteCategory)

module.exports = router
