const db = require('../helpers/db')
const table = 'product'
const tableImage = 'product_image'
const table1 = 'category'
// const table2 = 'rating'

module.exports = {
  getItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  createItemModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name, price, description, category) 
    VALUES ("${arr[0]}", ${arr[1]}, "${arr[2]}", ${arr[3]})`, (_err, result, field) => {
      cb(_err, result)
    })
  },
  addItemPictureMOdel: (cb) => {
    db.query(`INSERT INTO ${tableImage} VALUES `, (_err, result, field) => {
      cb(_err, result)
    })
  },
  updateItemModel: (arr, id, cb) => {
    db.query(`UPDATE ${table} SET name='${arr[0]}', price= ${arr[1]}, description='${arr[2]}', category= ${arr[3]} WHERE id=${id}`, (_err, hasil, field) => {
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
    db.query(`
    SELECT ${table}.id, ${table1}.category_name, ${table}.name, ${table}.price, ${table}.description, ${table}.input_date, ${table}.update_date
    FROM ${table} INNER JOIN ${table1} ON ${table}.category = ${table1}.id
    WHERE ${arr[0]} 
    LIKE '%${arr[1]}%' 
    ORDER BY ${sort[0]} ${sort[1]} 
    LIMIT ${num[0]} 
    OFFSET ${num[1]}`,
    (_err, result, field) => {
      cb(_err, result)
    })
  },
  searchItemModel: (search, sort, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${search[0]} LIKE '%${search[1]}%' ORDER BY ${sort[0]} ${sort[1]} `, (_err, result, field) => {
      cb(result)
    })
  }
}
