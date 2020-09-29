const jwt = require('jsonwebtoken')
const responseStandar = require('../helpers/response')
const { getUserByCondition } = require('../models/userModel')
const bcrypt = require('bcryptjs')

module.exports = {
  AdminLoginControl: async (req, res) => {
    const { email, password } = req.body
    const data = await getUserByCondition([{ email }])
    const compared = await bcrypt.compare(password, data[0].password)
    if (data.length) {
      if (data[0].roles_id === 1) {
        if (compared === true) {
          jwt.sign({ id: data[0].id }, process.env.ADMIN_APP_KEY, (err, token) => {
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
          jwt.sign({ id: data[0].id }, process.env.SELLER_APP_KEY, (err, token) => {
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
    const data = await getUserByCondition([{ email }])
    const compared = await bcrypt.compare(password, data[0].password)
    if (data.length) {
      if (data[0].roles_id === 3) {
        if (compared === true) {
          jwt.sign({ id: data[0].id }, process.env.CUSTOMMER_APP_KEY, (err, token) => {
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
  }
}
