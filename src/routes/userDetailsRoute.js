const { Router } = require('express')
const { createProfile, getProfile, getProfileById, updateProfile, updatePartProfile, deleteProfile } = require('../controller/userDetailController')

const router = Router()

const { adminMiddleware } = require('../middlewares/auth')

const uploadHelper = require('../helpers/upload')
const validationImage = require('../helpers/validationImg')

router.post('/', uploadHelper.single('pictures'), validationImage, createProfile)
router.get('/', adminMiddleware, getProfile)
router.get('/:id', adminMiddleware, getProfileById)
router.delete('/:id', deleteProfile)
router.put('/:id', uploadHelper.single('pictures'), validationImage, updateProfile)
router.patch('/:id', uploadHelper.single('pictures'), validationImage, updatePartProfile)

module.exports = router
