const router = require('express').Router()
const rolesController = require('../controller/rolesController')

router.post('/user', rolesController.creat)
router.get('/user', rolesController.read)

module.exports = router
