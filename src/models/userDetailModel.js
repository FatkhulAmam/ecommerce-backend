const db = require('../helpers/db')
const table = 'user_detail'
const table1 = 'user'

module.exports = {
  readUser: (data = []) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT ${table}.user_id, ${table1}.user_name, ${table1}.email, ${table}.phone, ${table}.photo, ${table}.gender, ${table}.birth
      FROM ${table} INNER JOIN ${table1} ON ${table}.user_id = ${table1}.id 
      LIMIT ? OFFSET ?`, data, (err, results, fields) => {
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
  createUserModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (user_id, user_name, phone, photo) VALUES ('${arr[0]}', '${arr[1]}', '${arr[2]}', '${arr[3]}')`, (err, result, field) => {
      cb(err, result)
    })
  },
  getProfileModel: (id, cb) => {
    db.query(`SELECT ${table}.user_id, ${table1}.user_name, ${table1}.email, ${table}.phone, ${table}.photo, ${table}.gender, ${table}.birth
      FROM ${table} INNER JOIN ${table1} ON ${table}.user_id = ${table1}.id WHERE ${table}.id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  // getOtentifikasi: (cb) => {
  //   db.query(`SELECT id, email, password FROM ${table}`, (_err, result, field) => {
  //     cb(result)
  //   })
  // },
  updateProfileModel: (arr, id, cb) => {
    db.query(`UPDATE ${table} SET user_id='${arr[0]}', user_name= '${arr[1]}', phone='${arr[2]}', photo='${arr[3]}' WHERE id=${id}`, (_err, hasil, field) => {
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
