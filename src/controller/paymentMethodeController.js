const joi = require('joi')
const { addMethodePaymentModel } = require('../models/paymentMethodeModel')
const responseStandart = require('../helpers/response')

module.exports = {
  addMethode: async (req, res) => {
    const schema = joi.object({
      methode: joi.string().required()
    })
    const { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandart(res, 'Failed add payment methode', { Error: error.message }, 401, false)
    } else {
      const { methode } = result
      const dataMethode = {
        payment_methode: methode
      }
      const createAddress = await addMethodePaymentModel(dataMethode)
      if (createAddress.affectedRows) {
        return responseStandart(res, 'payment methode added', { dataMethode })
      } else {
        return responseStandart(res, 'cannot add payment methode', {}, 401, false)
      }
    }
  }
}
