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
  getUserByCondition: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table1} WHERE ?`, data, (err, result, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getUserByConditionDetail: (data = {}) => {
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
  getProfileModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT ${table}.user_id, ${table1}.user_name, ${table1}.email, ${table}.phone, ${table}.photo, ${table}.gender, ${table}.birth
      FROM ${table} INNER JOIN ${table1} ON ${table}.user_id = ${table1}.id WHERE ${table1}.id=?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  createUserModel: (data = {}) => {
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
  updateProfilModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table1} SET ? WHERE id=?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updatePartProfileModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table} SET ? WHERE id=?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updatePartProfileDetailModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table} SET ? WHERE user_id=?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // updatePartProfileModel: (id, data, cb) => {
  //   db.query(`UPDATE ${table} SET ${data} WHERE id=${id}`, (_err, result, field) => {
  //     cb(result)
  //   })
  // },
  deleteProfileModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM ${table1} WHERE id=?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteProfileDetailModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM ${table} WHERE user_id=?`, data, (err, result, field) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
