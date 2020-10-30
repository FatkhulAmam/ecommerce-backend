const db = require('../helpers/db')
const table = 'payment_methode'

module.exports = {
  addMethodePaymentModel: (data = {}) => {
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
