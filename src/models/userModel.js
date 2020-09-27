const db = require('../helpers/db')
const table = 'user'

module.exports = {
  readUser: (data = []) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} LIMIT ? OFFSET ?`, data, (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  constUser: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) as count FROM ${table}`, (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results[0].count)
        }
      })
    })
  },
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
  // getOtentifikasi: (data) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT id, roles_id, email, password FROM ${table}`, data, (err, result, field) => {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         resolve(result)
  //       }
  //     })
  //   })
  // },
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
