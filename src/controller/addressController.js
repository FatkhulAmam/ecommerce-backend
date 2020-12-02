const joi = require('joi')
const {
  createAddressModel, getAddressModel,
  updateAddressModel, getAddressByIdModel,
  getAddressByUserIdModel, updatePartAddressModel
} = require('../models/addressModel')
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
      const { home, recipientName, recipientPhone, address, city, postalCode } = result
      const dataAddress = {
        user_id: id,
        home: home,
        recipients_name: recipientName,
        recipients_phone: recipientPhone,
        address: address,
        city: city,
        postal_code: postalCode,
        primary_address: 1
      }
      const createAddress = await createAddressModel(dataAddress)
      if (createAddress.affectedRows) {
        return responseStandart(res, 'address added', { dataAddress })
      } else {
        return responseStandart(res, 'cannot add adsress', {}, 401, false)
      }
    }
  },
  getAddressControl: async (req, res) => {
    const { id } = req.user
    const results = await getAddressByUserIdModel(id)
    if (results.length) {
      console.log(results.length)
      const data = results.map(profile => {
        profile = {
          ...profile,
          password: undefined
        }
        return profile
      })
      responseStandart(res, `address of user id ${id}`, { data })
    } else {
      responseStandart(res, `address for user with id ${id} is not found`, {}, 404, false)
    }
  },
  getAddressById: async (req, res) => {
    const { id } = req.params
    const results = await getAddressByIdModel(id)
    if (results.length) {
      return responseStandart(res, `user with id ${id}`, { data: results })
    } else {
      return responseStandart(res, `cannot get id ${id} address`, {}, 401, false)
    }
  },
  updateAddressController: async (req, res) => {
    const { id } = req.user
    const { home, recipientName, recipientPhone, address, city, postalCode, primaryAddress } = req.body
    if (home.trim() && recipientName.trim() && recipientPhone.trim() && address.trim() && city.trim() && postalCode.trim() && primaryAddress) {
      getAddressModel(id, result => {
        if (result.length) {
          updateAddressModel([home, recipientName, recipientPhone, address, city, postalCode, primaryAddress], id, hasil => {
            console.log(hasil)
            if (hasil.affectedRows) {
              return responseStandart(res, `address update on user ${id}`, { data: result })
            } else {
              return responseStandart(res, `user address on id ${id}, cannot be update`, {}, 400, false)
            }
          })
        }
      })
    }
  },
  updatePartAddress: async (req, res) => {
    const { id } = req.params
    const { home = '', recipient_name = '', recipient_phone = 0, address = '', city = '', postal_code = 0, primary_address = 1 } = req.body
    const results = await getAddressByIdModel(id)
    console.log(id)
    if (results.length) {
      if (home || recipient_name || recipient_phone || address || city || postal_code || primary_address) {
        const table = {
          ...req.body
        }
        const data = await updatePartAddressModel([table, id])
        if (data.affectedRows) {
          return responseStandart(res, 'address update', { data: { ...table } })
        } else {
          return responseStandart(res, 'cannot update address', {}, 401, false)
        }
      } else {
        return responseStandart(res, 'cannot update address', {}, 401, false)
      }
    } else {
      responseStandart(res, `address with id ${id} is not found`, {}, 404, false)
    }
  },
}
