const { Router } = require('express')
const { getCategory, createCategory, getDetailCategory, deleteCategory } = require('../controller/categoryController')

const router = Router()

router.get('/', getCategory)
router.post('/', createCategory)
router.get('/:id', getDetailCategory)
router.delete('/:id', deleteCategory)

module.exports = router
