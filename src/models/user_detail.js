const db = require('../helpers/db')
const table = 'user_detail'

module.exports = {
  createUserModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (user_id, user_name, phone, photo) VALUES ('${arr[0]}', '${arr[1]}', '${arr[2]}', '${arr[3]}')`, (err, result, field) => {
      cb(err, result)
    })
  },
  getProfileModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  // getOtentifikasi: (cb) => {
  //   db.query(`SELECT id, email, password FROM ${table}`, (_err, result, field) => {
  //     cb(result)
  //   })
  // },
  updateProfileModel: (arr, id, cb) => {
    db.query(`UPDATE ${table} SET user_name="${arr[0]}", email= '${arr[1]}', password="${arr[2]}" WHERE id=${id}`, (_err, hasil, field) => {
      cb(hasil)
    })
  },
  updatePartProfileModel: (id, data, cb) => {
    db.query(`UPDATE ${table} SET ${data} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteProfileModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
