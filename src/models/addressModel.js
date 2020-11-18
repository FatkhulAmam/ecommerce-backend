const db = require('../helpers/db')
const table = 'address'

module.exports = {
  createAddressModel: (data = {}) => {
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
  getAddressModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  updateAddressModel: (arr, id, cb) => {
    db.query(`UPDATE ${table} SET
      home='${arr[0]}',
      recipients_name= '${arr[1]}',
      recipients_phone= ${arr[2]},
      address='${arr[3]}',
      city='${arr[4]}',
      postal_code=${arr[5]}
      WHERE user_id=${id}`,
    (_err, hasil, field) => {
      cb(hasil)
    })
  },
  getAddressByIdModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE id=?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // get address user by id user
  getAddressByUserIdModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE user_id=?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // update partialy
  updatePartAddressModel: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table} SET ? WHERE id=?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
