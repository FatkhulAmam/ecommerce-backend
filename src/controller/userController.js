// const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const paging = require('../helpers/pagination')
const responseStandar = require('../helpers/response')
const joi = require('joi')
const bcrypt = require('bcryptjs')

module.exports = {
  readUser: async (req, res) => {
    const count = await userModel.constUser()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await userModel.readUser([limit, offset])
    return responseStandar(res, 'List User', { result, pageInfo })
  },
  creatUser: async (req, res) => {
    const schema = joi.object({
      roles_id: joi.string().required(),
      user_name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required()
    })
    let { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandar(res, 'Error', { error: error.message }, 401, false)
    } else {
      const { email } = result
      const isExists = await userModel.getUserByCondition({ email })
      if (isExists.length > 0) {
        return responseStandar(res, 'email alreade used', {}, 401, false)
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(result.password, salt)
        result = {
          ...result,
          password: hashedPassword
        }
        const data = await userModel.createUser(result)
        if (data.affectedRows) {
          result = {
            id: data.insertId,
            ...result,
            password: undefined
          }
          return responseStandar(res, 'user created', { result })
        } else {
          return responseStandar(res, 'failed create user', {}, 401, false)
        }
      }
    }
  },
  updateUser: async (req, res) => {
    const schema = joi.object({
      roles_id: joi.string().required(),
      user_name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required()
    })
    let { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandar(res, 'Error', { error: error.message }, 401, false)
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(result.password, salt)
      result = {
        ...result,
        password: hashedPassword
      }
      const data = await userModel.createUser(result)
      if (data.affectedRows) {
        result = {
          id: data.insertId,
          ...result,
          password: undefined
        }
        return responseStandar(res, 'user created', { result })
      } else {
        return responseStandar(res, 'failed create user', {}, 401, false)
      }
    }
  }
}
