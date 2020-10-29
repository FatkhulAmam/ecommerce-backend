const { Router } = require('express')
const { createDetailProfile, getDetailUser, updateProfile, updatePartProfile, deleteProfile } = require('../controller/userDetailController')

const router = Router()

const authMiddleware = require('../middlewares/auth')

const uploadHelper = require('../helpers/upload')
const validationImage = require('../helpers/validationImg')

// router.post('/', uploadHelper.single('pictures'), validationImage, createProfile)
router.get('/', authMiddleware, getDetailUser)
router.post('/', uploadHelper.single('pictures'), validationImage, createDetailProfile)
router.delete('/', deleteProfile)
router.put('/', uploadHelper.single('pictures'), validationImage, updateProfile)
router.patch('/', uploadHelper.single('pictures'), validationImage, updatePartProfile)

module.exports = router
