const joi = require('joi')
const ratingModel = require('../models/ratingModel')
const responseStandar = require('../helpers/response')

module.exports = {
  giveRating: async (req, res) => {
    const schema = joi.object({
      product_id: joi.string().required(),
      rating: joi.string().required()
    })
    const { value: result } = schema.validate(req.body)
    const rating = await ratingModel.giveRatingModel(result)
    if (rating.affectedRows) {
      return responseStandar(res, 'added', { result })
    } else {
      return responseStandar(res, 'failed give rating', {}, 401, false)
    }
  }
}
