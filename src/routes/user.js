const { Router } = require('express')
const { createProfile, getProfile, updateProfile, updatePartProfile, deleteProfile } = require('../controller/user')

const router = Router()

router.post('/', createProfile)
router.get('/:id', getProfile)
router.delete('/:id', deleteProfile)
router.put('/:id', updateProfile)
router.patch('/:id', updatePartProfile)

module.exports = router
