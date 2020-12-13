const db = require('../helpers/db')
const table1 = 'cart'
const table2 = 'user'
const table3 = 'product'
const table4 = 'product_image'

module.exports = {
  createCartModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table1} SET ?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getCartUserModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT ${table1}.id, ${table2}.user_name, ${table3}.name, ${table1}.amount, ${table3}.price, ${table4}.url
       FROM ${table1} 
       INNER JOIN ${table3} ON ${table1}.items_id = ${table3}.id
       INNER JOIN ${table2} ON ${table1}.user_id=${table2}.id
       INNER JOIN ${table4} ON ${table1}.items_id=${table4}.product_id
       WHERE ${table1}.user_id=?`, data, (err, result, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getCartDelModel: (id, cb) => {
    db.query(`SELECT * FROM ${table1} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteItemModel: (id, cb) => {
    db.query(`DELETE FROM ${table1} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
