const db = require('../helpers/db')
const table = 'product_condition'

module.exports = {
  addConditionModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table} SET ?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getConditionModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE product_id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteConditionModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE product_id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
