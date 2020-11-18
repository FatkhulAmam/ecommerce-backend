const router = require('express').Router()
const { createAddressController, updateAddressController, getAddressControl, updatePartAddress } = require('../controller/addressController')

router.post('/address', createAddressController)
router.get('/address', getAddressControl)
router.put('/address', updateAddressController)
router.patch('/address/:id', updatePartAddress)
// router.patch('/address', updatePartialAddressController)

module.exports = router
