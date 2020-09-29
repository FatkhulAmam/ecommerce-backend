const jwt = require('jsonwebtoken')
const responseStandart = require('../helpers/response')

module.exports = {
  adminMiddleware: (req, res, next) => {
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        if (jwt.verify(token, process.env.ADMIN_APP_KEY)) {
          next()
        } else {
          return responseStandart(res, 'Unauthorize', {}, 401, false)
        }
      } catch (err) {
        return responseStandart(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandart(res, 'Forbiden Access', {}, 403, false)
    }
  },
  sellerMiddleware: (req, res, next) => {
    const { authorization } = req.headers
    console.log(authorization)
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        if (jwt.verify(token, process.env.SELLER_APP_KEY)) {
          next()
        } else {
          return responseStandart(res, 'Unauthorize', {}, 401, false)
        }
      } catch (err) {
        return responseStandart(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandart(res, 'Forbiden Access', {}, 403, false)
    }
  },
  custommerMiddleware: (req, res, next) => {
    const { authorization } = req.headers
    console.log(authorization)
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        if (jwt.verify(token, process.env.CUSTOMMER_APP_KEY)) {
          next()
        } else {
          return responseStandart(res, 'Unauthorize', {}, 401, false)
        }
      } catch (err) {
        return responseStandart(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandart(res, 'Forbiden Access', {}, 403, false)
    }
  }
}
