const joi = require('joi')
const { createAddressModel } = require('../models/addressModel')
const responseStandart = require('../helpers/response')

module.exports = {
  createAddressController: async (req, res) => {
    const { id } = req.user
    const schema = joi.object({
      home: joi.string().required(),
      recipientName: joi.string().required(),
      recipientPhone: joi.string().required(),
      address: joi.string().required(),
      city: joi.string().required(),
      postalCode: joi.string().required()
    })
    const { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandart(res, 'Failed create address', { Error: error.message }, 401, false)
    } else {
      const { home, recipientName, rescipientPhone, address, city, postalCode } = result
      const dataAddress = {
        user_id: id,
        home: home,
        recipients_name: recipientName,
        recipients_phone: rescipientPhone,
        address: address,
        city: city,
        postal_code: postalCode
      }
      const createAddress = await createAddressModel(dataAddress)
      if (createAddress.affectedRows) {
        return responseStandart(res, 'address added', { dataAddress })
      } else {
        return responseStandart(res, 'cannot add adsress', {}, 401, false)
      }
    }
  }
}
