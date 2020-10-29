const joi = require('joi')
const { addConditionModel, getConditionModel, deleteConditionModel } = require('../models/conditionModel')
const responseStandart = require('../helpers/response')

module.exports = {
  addCondition: async (req, res) => {
    const schema = joi.object({
      productId: joi.string().required(),
      condition: joi.string().required()
    })
    const { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandart(res, 'Failed create add condition', { Error: error.message }, 401, false)
    } else {
      const { productId, condition } = result
      const dataCondition = {
        product_id: productId,
        condition: condition
      }
      const createAddress = await addConditionModel(dataCondition)
      if (createAddress.affectedRows) {
        return responseStandart(res, 'condition added', { dataCondition })
      } else {
        return responseStandart(res, 'cannot add condition', {}, 401, false)
      }
    }
  },
  deleteCondition: async (req, res) => {
    const { id } = req.params
    getConditionModel(id, result => {
      if (result.length) {
        deleteConditionModel(id, result => {
          if (result.affectedRows) {
            return responseStandart(res, `condition product id ${id} deleted`)
          } else {
            return responseStandart(res, 'cannot delete condition product', 401, false)
          }
        })
      } else {
        return responseStandart(res, 'no product founded', 401, false)
      }
    })
  }
}
