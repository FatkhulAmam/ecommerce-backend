const { Router } = require('express')
const { createDetailProfile, getDetailUser, updateProfile, updatePartProfile, deleteProfile, updateAvatar } = require('../controller/userDetailController')

const router = Router()

const authMiddleware = require('../middlewares/auth')

const uploadHelper = require('../helpers/upload')

router.get('/', authMiddleware, getDetailUser)
router.post('/', uploadHelper.single('photo'), createDetailProfile)
router.delete('/', deleteProfile)
router.put('/', uploadHelper.single('photo'), updateProfile)
router.patch('/', updatePartProfile)
router.patch('/avatar', uploadHelper.single('pictures'), updateAvatar)

module.exports = router
