const router = require('express').Router()
const { createAddressController } = require('../controller/addressController')

router.post('/address', createAddressController)

module.exports = router
