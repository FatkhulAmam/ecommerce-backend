const db = require('../helpers/db')
const table1 = 'product'
const table2 = 'category'

module.exports = {
  createCategoryModel: (arr, cb) => {
    db.query(`INSERT INTO ${table2} (category_name, photo) VALUES ('${arr[0]}', '${arr[1]}')`, (_err, result, field) => {
      cb(_err, result)
    })
  },
  getCategoryModel: (id, cb) => {
    db.query(`SELECT *FROM ${table2} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteCategoryModel: (id, cb) => {
    db.query(`DELETE FROM ${table2} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  getAllCategoryModel: (arr, sort, num, cb) => {
    db.query(`SELECT * FROM ${table2} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${sort[0]} ${sort[1]} LIMIT ${num[0]} OFFSET ${num[1]} `, (_err, result, field) => {
      cb(_err, result)
    })
  },
  searchCategoryModel: (search, sort, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table1} WHERE ${search[0]} LIKE '%${search[1]}%' ORDER BY ${sort[0]} ${sort[1]} `, (_err, result, field) => {
      cb(result)
    })
  }
}
