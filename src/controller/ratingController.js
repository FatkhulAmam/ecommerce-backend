const joi = require('joi')
const { giveRatingModel } = require('../models/ratingModel')
const responseStandart = require('../helpers/response')

module.exports = {
  giveRating: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      productId: joi.string().required(),
      rating: joi.string().required()
    })
    const { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandart(res, 'Failed create address', { Error: error.message }, 401, false)
    } else {
      const { productId, rating } = result
      const dataRating = {
        user_id: id,
        product_id: productId,
        rating: rating
      }
      const createAddress = await giveRatingModel(dataRating)
      if (createAddress.affectedRows) {
        return responseStandart(res, 'address added', { dataRating })
      } else {
        return responseStandart(res, 'cannot add adsress', {}, 401, false)
      }
    }
  }
}
