// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const responseStandar = require('../helpers/response')
const paging = require('../helpers/pagination')
const joi = require('joi')

module.exports = {
  read: async (req, res) => {
    const count = await userModel.constUser()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await userModel.readUser([limit, offset])
    return responseStandar(res, 'List User', { result, pageInfo })
  },
  cread: async (req, res) => {
    const schema = joi.object({
      roles_id: joi.string().required(),
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
        const hashedPass = await bcrypt.hash(result.password, salt)
        result = {
          ...result,
          password: hashedPass
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
  // loginController: (req, res) => {
  //   const { email, password } = req.body
  //   getOtentifikasi(result => {
  //     if (result) {
  //       result.find(o => {
  //         if (email === o.email && password === o.password) {
  //           jwt.sign({ id: result.id }, process.env.APP_KEY, (_err, token) => {
  //             return responseStandar(res, `token : ${token}`)
  //           })
  //         } else {
  //           return responseStandar(res, 'wrong email or password', {}, 400, false)
  //         }
  //       })
  //     } else {
  //       return responseStandar(res, 'enter the email and password', {}, 400, false)
  //     }
  //   })
  // }
}
