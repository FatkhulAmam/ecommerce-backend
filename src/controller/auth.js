const jwt = require('jsonwebtoken')
const { getOtentifikasi } = require('../models/user')
const responseStandar = require('../helpers/response')

module.exports = {
  loginController: (req, res) => {
    const { email, password } = req.body
    getOtentifikasi(result => {
      if (result) {
        result.find(o => {
          if (email === o.email && password === o.password) {
            jwt.sign({ id: result.id }, process.env.APP_KEY, (_err, token) => {
              return responseStandar(res, `token : ${token}`)
            })
          } else {
            return responseStandar(res, 'wrong email or password', {}, 400, false)
          }
        })
      } else {
        return responseStandar(res, 'enter the email and password', {}, 400, false)
      }
    })
  }
}
