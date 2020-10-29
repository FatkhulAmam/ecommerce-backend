const router = require('express').Router()
const ratingController = require('../controller/ratingController')

router.post('/rating', ratingController.giveRating)

module.exports = router
