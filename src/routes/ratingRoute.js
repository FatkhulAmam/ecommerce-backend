const router = require('express').Router()
const ratingControl = require('../controller/ratingController')

router.post('/', ratingControl.giveRating)

module.exports = router
