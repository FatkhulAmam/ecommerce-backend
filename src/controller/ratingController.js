const joi = require('joi')
const ratingModel = require('../models/ratingModel')
const responseStandar = require('../helpers/response')

module.exports = {
  giveRating: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      productId: joi.string().required(),
      rating: joi.string().required()
    })
    const { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandar(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { productId, rating } = result
      const ratingData = {
        user_id: id,
        product_id: productId,
        rating: rating
      }
      const addRating = await ratingModel.giveRatingModel(ratingData)
      if (addRating.affectedRows) {
        return responseStandar(res, 'added to cart', { result })
      } else {
        return responseStandar(res, 'cannot add to cart', {}, 401, false)
      }
    }
  }
}
