const jwt = require('jsonwebtoken')
const responseStandar = require('../helpers/response')
const { getUserByCondition } = require('../models/userModel')
const bcrypt = require('bcryptjs')

module.exports = {
  AdminLoginControl: async (req, res) => {
    const { email, password } = req.body
    // console.log(await getUserByCondition([{ email }]))
    const data = await getUserByCondition([{ email }])
    // console.log(data)
    if (data.length) {
      const hashed = data[0].password
      const roleId = data[0].roles_id
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      //   console.log(password)
      console.log(hashed)
      //   console.log(compared)
      if (roleId === 1) {
        if (compared === true) {
          jwt.sign({ id: id }, process.env.APP_KEY, (err, token) => {
            if (err) {
              return responseStandar(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandar(res, 'Login as admin successfuly', { token })
            }
          })
        } else {
          return responseStandar(res, 'Wrong email or password', {}, 400, false)
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
    if (data.length) {
      const hashed = data[0].password
      const roleId = data[0].roles_id
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      console.log(compared)
      if (roleId === 2) {
        if (compared === true) {
          jwt.sign({ id: id }, process.env.APP_KEY, (err, token) => {
            if (err) {
              return responseStandar(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandar(res, 'Login as seller successfuly', { token })
            }
          })
        } else {
          return responseStandar(res, 'Wrong email or password', {}, 400, false)
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
    const data = await getUserByCondition([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const roleId = data[0].roles_id
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (roleId === 3) {
        if (compared === true) {
          jwt.sign({ id: id }, process.env.APP_KEY, (err, token) => {
            if (err) {
              return responseStandar(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandar(res, 'Login as customer successfuly', { token })
            }
          })
        } else {
          return responseStandar(res, 'Wrong email or password', {}, 400, false)
        }
      } else {
        return responseStandar(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandar(res, 'Wrong email or password', {}, 400, false)
    }
  }
}
