// const bcrypt = require('bcryptjs')
const rolesModel = require('../models/rolesModel')
const responseStandar = require('../helpers/response')
const paging = require('../helpers/pagination')
const joi = require('joi')

module.exports = {
  creat: async (req, res) => {
    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required()
    })
    let { value: result } = schema.validate(req.body)
    const data = await rolesModel.createRoles(result)
    if (data.affectedRows) {
      result = {
        id: data.insertId,
        ...result
      }
      return responseStandar(res, 'created', { result })
    } else {
      return responseStandar(res, 'failed create user', {}, 401, false)
    }
  },
  read: async (req, res) => {
    const count = await rolesModel.constUser()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await rolesModel.readUser([limit, offset])
    return responseStandar(res, 'List User', { result, pageInfo })
  }
}
