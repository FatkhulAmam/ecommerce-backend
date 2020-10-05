const router = require('express').Router()
const { giveRating } = require('../controller/ratingController')

router.post('/', giveRating)

module.export = router
