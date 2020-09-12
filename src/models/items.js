const db = require('../helpers/db')
const table = 'items'

module.exports = {
  getItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  createItemModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name, price, description) VALUES ('${arr[0]}', ${arr[1]}, '${arr[2]}')`, (_err, result, field) => {
      cb(_err, result)
    })
  },
  updateItemModel: (arr, cb) => {
    db.query(`UPDATE ${table} SET name='${arr[0]}', price= ${arr[1]}, description='${arr[2]}' WHERE id=${arr[3]}`, (_err, hasil, field) => {
      cb(hasil)
    })
  },
  updatePartialItemModel: (id, data, cb) => {
    db.query(`UPDATE ${table} SET ${data} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleItemModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  getAllItemModel: (arr, sort, num, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${sort[0]} ${sort[1]} LIMIT ${num[0]} OFFSET ${num[1]}`, (_err, result, field) => {
      cb(_err, result)
    })
  },
  searchItemModel: (search, sort, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${search[0]} LIKE '%${search[1]}%' ORDER BY ${sort[0]} ${sort[1]}`, (_err, result, field) => {
      cb(result)
    })
  }
}
