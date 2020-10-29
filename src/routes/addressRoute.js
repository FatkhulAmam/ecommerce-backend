const router = require('express').Router()
const { createAddressController, updateAddressController } = require('../controller/addressController')

router.post('/address', createAddressController)
router.put('/address', updateAddressController)
// router.patch('/address', updatePartialAddressController)

module.exports = router
