const db = require('../helpers/db')
const table = 'user'

module.exports = {
  getUserByCondition: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE ?`, data, (err, result, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  createUser: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table} SET ?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
