const jwt = require('jsonwebtoken')
const responseStandar = require('../helpers/response')
const { getUserByCondition, createUser, addPhoneNumber } = require('../models/authModel')
const joi = require('joi')
const bcrypt = require('bcryptjs')

module.exports = {
  AdminLoginControl: async (req, res) => {
    const { email, password } = req.body
    const data = await getUserByCondition([{ email }])
    const compared = await bcrypt.compare(password, data[0].password)
    if (data.length) {
      if (data[0].roles_id === 1) {
        if (compared === true) {
          jwt.sign({ id: data[0].id }, process.env.APP_KEY, (err, token) => {
            if (err) {
              return responseStandar(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandar(res, `Hello Admin ${data[0].id}`, { token })
            }
          })
        } else {
          return responseStandar(res, 'Wrong password', {}, 400, false)
        }
      } else {
        return responseStandar(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandar(res, 'Wrong email or password', {}, 400, false)
    }
  },
  SellerLoginController: async (req, res) => {
    const { email, password } = req.body
    const data = await getUserByCondition([{ email }])
    const compared = await bcrypt.compare(password, data[0].password)
    if (data.length) {
      if (data[0].roles_id === 2) {
        if (compared === true) {
          jwt.sign({ id: data[0].id }, process.env.APP_KEY, (err, token) => {
            if (err) {
              return responseStandar(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandar(res, 'lets sell anything seller', { token })
            }
          })
        } else {
          return responseStandar(res, 'Wrong password', {}, 400, false)
        }
      } else {
        return responseStandar(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandar(res, 'Wrong email or password', {}, 400, false)
    }
  },
  CustommerLoginController: async (req, res) => {
    const { email, password } = req.body
    const data = await getUserByCondition([email])
    const compared = await bcrypt.compare(password, data[0].password)
    if (data.length) {
      if (data[0].roles_id === 3) {
        if (compared === true) {
          jwt.sign({ id: data[0].id }, process.env.APP_KEY, (err, token) => {
            if (err) {
              return responseStandar(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandar(res, 'buy anythink do you want', { token })
            }
          })
        } else {
          return responseStandar(res, 'Wrong password', {}, 400, false)
        }
      } else {
        return responseStandar(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandar(res, 'Wrong email or password', {}, 400, false)
    }
  },
  registerController: async (req, res) => {
    switch (req.params.role) {
      case 'admin': {
        const schema = joi.object({
          user_name: joi.string().required(),
          email: joi.string().required(),
          password: joi.string().required()
        })
        let { value: result, error } = schema.validate(req.body)
        if (!error) {
          const salt = bcrypt.genSaltSync(10)
          const hashedPass = bcrypt.hashSync(result.password, salt)
          const userData = {
            user_name: result.user_name,
            email: result.email,
            password: hashedPass,
            roles_id: 1
          }
          const createdUser = await createUser(userData)
          if (createdUser.affectedRows) {
            result = {
              ...result,
              password: undefined
            }
            return responseStandar(res, 'register Success', { result })
          } else {
            return responseStandar(res, 'register failed', {}, 401, false)
          }
        } else {
          return responseStandar(res, 'error', {}, 401, false)
        }
      }
      case 'seller': {
        const schema = joi.object({
          user_name: joi.string().required(),
          email: joi.string().required(),
          store_name: joi.string().required(),
          phone: joi.string().required(),
          password: joi.string().required()
        })
        let { value: result, error } = schema.validate(req.body)
        if (!error) {
          const salt = bcrypt.genSaltSync(10)
          const hashedPass = bcrypt.hashSync(result.password, salt)
          const userData = {
            user_name: result.user_name,
            email: result.email,
            store_name: result.store_name,
            password: hashedPass,
            roles_id: 2
          }
          const createdUser = await createUser(userData)
          const phone = {
            phone: result.phone
          }
          const phoneNum = await addPhoneNumber(phone)
          if (createdUser.affectedRows && phoneNum.affectedRows) {
            result = {
              ...result,
              password: undefined
            }
            return responseStandar(res, 'register Success', { result })
          } else {
            return responseStandar(res, 'register failed', {}, 401, false)
          }
        } else {
          return responseStandar(res, 'Error', { error: error.message }, 401, false)
        }
      }
      case 'custommer': {
        const schema = joi.object({
          name: joi.string().required(),
          email: joi.string().required(),
          password: joi.string().required()
        })
        let { value: result, error } = schema.validate(req.body)
        if (!error) {
          const salt = bcrypt.genSaltSync(10)
          const hashedPass = bcrypt.hashSync(result.password, salt)
          const userData = {
            user_name: result.name,
            email: result.email,
            password: hashedPass,
            roles_id: 3
          }
          const createdUser = await createUser(userData)
          if (createdUser.affectedRows) {
            result = {
              ...result,
              password: undefined
            }
            return responseStandar(res, 'register Success', { result })
          } else {
            return responseStandar(res, 'register failed', {}, 401, false)
          }
        } else {
          return responseStandar(res, 'error', {}, 401, false)
        }
      }
      default:
        break
    }
  }
}
