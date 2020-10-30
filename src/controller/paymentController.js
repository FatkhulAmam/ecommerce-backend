const joi = require('joi')
const responseStandart = require('../helpers/response')
const { addSaldoModel } = require('../models/paymentModel')

module.exports = {
  createPayment: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      methodeId: joi.string().required(),
      topUp: joi.string().required()
    })
    const { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandart(res, 'Failed add payment methode', { Error: error.message }, 401, false)
    } else {
      const { methodeId, topUp } = result
      const dataTopUp = {
        user_id: id,
        methode_id: methodeId,
        saldo: topUp
      }
      const addSaldo = await addSaldoModel(dataTopUp)
      if (addSaldo.affectedRows) {
        return responseStandart(res, 'payment methode created', { dataTopUp })
      } else {
        return responseStandart(res, 'cannot create payment methode', {}, 401, false)
      }
    }
  }
}
