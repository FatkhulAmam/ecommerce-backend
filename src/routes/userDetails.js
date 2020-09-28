const { Router } = require('express')
const { createProfile, getProfile, updateProfile, updatePartProfile, deleteProfile } = require('../controller/userdetail')

const router = Router()

const uploadHelper = require('../helpers/upload')
const validationImage = require('../helpers/validationImg')

router.post('/', uploadHelper.single('pictures'), validationImage, createProfile)
router.get('/:id', getProfile)
router.delete('/:id', deleteProfile)
router.put('/:id', updateProfile)
router.patch('/:id', updatePartProfile)

module.exports = router
