const { Router } = require('express')
const { addCondition, deleteCondition } = require('../controller/conditionController')

const router = Router()

router.post('/condition', addCondition)
router.delete('/condition/:id', deleteCondition)

module.exports = router
